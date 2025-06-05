const express = require("express")
const { engineerList } = require("../controllers/manager")
const { auth, requireRole } = require("../middleware/auth")
const router = express.Router()

const manager = "Manager"
const engineer = "Engineer"

router.get("/engineerList", auth, requireRole(manager), engineerList)


module.exports = router