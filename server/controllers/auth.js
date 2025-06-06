const bcrypt = require("bcrypt")
const User = require("../models/user")
const Project = require("../models/project")
const Assignment = require("../models/assignment")

const jwt = require("jsonwebtoken")

const engineer = "Engineer"
const manager = "Manager"

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role, skills, seniority,
            maxCapacity, department
        } = req.body

        if (role === engineer) {
            if (!name || !email || !password || !confirmPassword || !role || skills.length === 0 || !seniority
                || !maxCapacity || !department
            ) {
                return res.status(400).json({
                    success: false,
                    message: "All Fields Required"
                })
            }
        } else {
            if (!name || !email || !password || !confirmPassword || !role) {
                return res.status(400).json({
                    success: false,
                    message: "All Fields Required"
                })
            }
        }
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User exists, Please login"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        let newUser = await User.create({
            name,
            email,
            password,
            role,
            skills,
            seniority,
            maxCapacity: (parseInt(maxCapacity) === 100 ? "full-time" : "part-time"),
            department
        })

        const tokenPayload = {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "24h" })
        let user = {}

        if (role === manager) {

            user = {
                name,
                email,
                role,
                _id: newUser._id,
                profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
            }
        } else {
            user = {
                name,
                email,
                role,
                skills,
                seniority,
                department,
                maxCapacity,
                _id: newUser._id,
                profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
            }
        }

        res.status(200).json({
            success: true,
            message: 'Signup Successfull',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to SignUp"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password Required"
            });
        }

        const registeredUser = await User.findOne({ email })

        if (!registeredUser) {
            return res.status(401).json({
                success: false,
                message: "User Not Registered, Please Signup"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, registeredUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const tokenPayload = {
            _id: registeredUser._id,
            email: registeredUser.email,
            role: registeredUser.role
        };
        const expiresIn = "24h"; // 24 hours in seconds
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn });

      

        const user = registeredUser.toObject();
        delete user.password

          if(registeredUser.role === manager) {
            user.projects = await Project.find({ managerId: registeredUser._id }).sort({ createdAt: -1 });
        }else {
            user.assignments = await Assignment.find({ engineerId: registeredUser._id })
        }

        const userAssignments = await Assignment.find({ engineerId: registeredUser._id }).populate("projectId");

        if (user.role === engineer && userAssignments.length > 0) {
            user.assignments = userAssignments
        } else {
            user.assignments = [];
        }

        user.profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${registeredUser?.name}`

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Login Failed, Please Try Again"
        });
    }
};