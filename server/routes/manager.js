const express = require("express")
const { engineerList, addProject, deleteProject, updateProject } = require("../controllers/manager")
const { auth, requireRole } = require("../middleware/auth")
const router = express.Router()

const manager = "Manager"
const engineer = "Engineer"

router.get("/engineersList", auth, requireRole(manager), engineerList)
router.post("/addProject", auth, requireRole(manager), addProject)
router.post("/updateProject", auth, requireRole(manager), updateProject)
router.delete("/project/:projectId", auth, requireRole(manager), deleteProject)


module.exports = router