const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
PORT = process.env.PORT || 2026
const cors = require("cors")
const { connection } = require("./config/database")
app.use(cors({
    // origin: "https://my-form-client.vercel.app",
    origin: "*",
    credentials: true
}))

const authRouter = require("./routes/auth")
const managerRouter = require("./routes/manager")

app.use("/api/auth", authRouter)
app.use("/api/manager", managerRouter)

app.get("/", (req, res) => {
    return res.json({
        success: "true",
        message: "EngineerFlow server is running successfully."
    })
})
connection()
app.listen(PORT, () => {
    console.log("EngineerFlow server is running on port:", PORT);
})