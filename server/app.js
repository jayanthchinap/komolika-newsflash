const express = require("express")
const cors = require("cors")
const path = require("path")
const http = require("http")

const indexRoute = require("./routes/index")

const app = express()

app.use(cors())
var server = http.createServer(app)

// view engine setup

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRoute)

const port = 4000
server.listen(port, () => {
  console.log(`Express app listening to port ${port}`)
})
