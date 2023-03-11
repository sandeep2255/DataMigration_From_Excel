const express = require("express");
const app = express();
const port = 3001;

app.get('/', (req, res)=>{
    res.send("App running, Hello");
});

app.listen(port, ()=>{
    console.log("port is listening");
});