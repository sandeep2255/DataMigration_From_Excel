const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql2');


const db = mysql.createPool({
    host:'localhost:3307',
    user:'root',
    password:'Sandeep@1999',
    database:'RIET',
});

app.get('/', (req, res)=>{
    res.send("App running, Hello");
});

app.listen(port, ()=>{
    console.log("port is listening");
});