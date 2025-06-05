const express = require("express")
const { engineerList, addProject } = require("../controllers/manager")
const { auth, requireRole } = require("../middleware/auth")
const router = express.Router()

const manager = "Manager"
const engineer = "Engineer"

router.get("/engineersList", auth, requireRole(manager), engineerList)
router.post("/addProject", auth, requireRole(manager), addProject)


module.exports = router