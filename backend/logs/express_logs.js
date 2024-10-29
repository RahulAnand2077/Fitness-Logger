const express = require("express");
const port = 3500;

const app = express();

app.post("/logs", async(req, res) => {
    
})

app.listen(port, () => {
    console.log(`${port}`)
})

// response = await fetch(localhost:3500)
// json = response.json
// json push kardiya paragraph workouts
// tmkc pehele 4 workout khatam karle