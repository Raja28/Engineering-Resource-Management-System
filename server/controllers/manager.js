const User = require("../models/user")
const Project = require("../models/project")
const Assignment = require("../models/assignment")

// exports.engineerList = async (req, res) => {
//     try {
//         const { user } = req

//         const engineers = await User.find({ role: 'engineer' }).select('-password');

//         if (engineers.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No engineer found"
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             message: "list fetched successfully",
//             engineers
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         })
//     }
// }

exports.engineerList = async (req, res) => {
    try {
      
        const engineers = await User.find({ role: 'Engineer' }).select('name _id');

        if (engineers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No engineer found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Engineers fetched successfully.",
            engineers,
        });
    } catch (error) {
        console.error("Error fetching engineers:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch engineers.",
        });
    }
};

exports.addProject = async (req, res) => {
  
    try {
        const { name, description, startDate, endDate, engineer,
             requiredSkills, teamSize, status, managerId } = req.body;

            const { user } = req;

        if (!name || !description || !startDate || !endDate ||  !engineer || !requiredSkills || !teamSize || !status || !managerId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const project = new Project({
            name,
            description,
            startDate,
            endDate,
            requiredSkills,
            teamSize,
            status,
            managerId: user._id
        });

        await project.save();
        
        const assignmentEngineer = await User.findById(engineer)

       const newAssignment = await Assignment.create({
        engineerId: engineer,
        projectId: project._id,
        allocationPercentage: 100,
        startDate,
        endDate,
        role: assignmentEngineer.role
       })

        return res.status(201).json({
            success: true,
            message: "Project added successfully.",
            project
        });
    } catch (error) {
        console.error("Error adding project:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add project."
        });
    }
}