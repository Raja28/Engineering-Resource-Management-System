const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or malformed"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "JWT secret not configured"
            });
        }

        try {
            const tokenData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = tokenData;
            next();
        } catch (error) {
            let message = "Invalid or expired token";
            if (error.name === "TokenExpiredError") {
                message = "Token has expired";
            } else if (error.name === "JsonWebTokenError") {
                message = "Invalid token";
            }
            return res.status(401).json({
                success: false,
                message
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Error validating token"
        });
    }
};


exports.requireRole = (role) => {
    return (req, res, next) => {
        try {
            const { user } = req;

            if (!user || user.role !== role) {
                return res.status(403).json({
                    success: false,
                    message: `Access denied: Only ${role} allowed`,
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Role verification failed for ${role}`,
            });
        }
    };
};



// exports.isManager = async (req, res, next) => {
//     try {
//         const { user } = req;

//         if (!user || user.role !== "manager") {
//             return res.status(403).json({
//                 success: false,
//                 message: "Access denied: Only manager allowed",
//             });
//         }

//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "isManager: User role can't be verified",
//         });
//     }
// };
// exports.isEngineer = async (req, res, next) => {
//     try {
//         const { user } = req;

//         if (!user || user.role !== "engineer") {
//             return res.status(403).json({
//                 success: false,
//                 message: "Access denied: Only engineer allowed",
//             });
//         }

//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "isEngineer: User role can't be verified",
//         });
//     }
// };
