/*const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())*/

export default async function handler(req, res) { /*app.get("/api/logImport", (req, res) => {*/
    //const query = req.query
    const query = req.query

    //console.log(query.uid, query.method)
    if (query && query.id) {
        console.log(query.id)
    }

    res.status(300).send(300)
}

//app.listen(3000)