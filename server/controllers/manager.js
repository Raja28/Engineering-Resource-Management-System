const User = require("../models/user")
const Project = require("../models/project")
const Assignment = require("../models/assignment")


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
             requiredSkills, teamSize, status } = req.body;

            const { user } = req;

        if (!name || !description || !startDate || !endDate ||  !engineer || !requiredSkills || !teamSize || !status) {
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
            requiredSkills: requiredSkills.split(',').map(skill => skill.trim()),
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

exports.updateProject = async (req, res) => {
  
    try {                                   
        console.log(req.body);
        
        const { projectId, name, description, startDate, endDate,
            requiredSkills, teamSize, status } = req.body;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required."
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        project.name = name || project.name;
        project.description = description || project.description;
        project.startDate = startDate || project.startDate;
        project.endDate = endDate || project.endDate;
        project.requiredSkills = requiredSkills ? requiredSkills.split(',').map(skill => skill.trim()) : project.requiredSkills;
        project.teamSize = teamSize || project.teamSize;
        project.status = status || project.status;

        await project.save();

        return res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            project
        });
        
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update project."
        });
    }
}

exports.deleteProject = async (req, res) => {
    console.log("Deleting project with ID:", req.params.projectId);
    
    try {
        const { projectId } = req.params;
        const { user } = req;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required."
            });
        }

        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found."
            });
        }

        await Assignment.deleteMany({ projectId });

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete project."
        });
    }
}