const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const http = require('http');

var app = express();
var router = express.Router();

var port = 3000;

app.use(express.static('public'));

var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "PoPogoio12",
    port: 3306,
    database: "garbageislands",
});

con.connect(function (err){
    if(err) throw err;
    console.log("connected!");
}); 


app.get("/users/:UserName/:Password/:Age/:UserExp", GetUser);

function GetUser(req,res){
    var reqData = req.params;
    var name = reqData.UserName;
    var pass = reqData.Password;
    var exp = Number(reqData.UserExp);
    var age = Number(reqData.Age);
    var level = 0;

    let sql = "INSERT INTO Users ( UserName, Age, Password, UserExp, UserLevel) values ('" + name + "' , "+ age + ",'" + pass + "',"+ exp +"," + level + "); ";

    con.query(sql,function (err, result) {
        if (err) throw err;
        console.log("UserCreated");
    });
}


app.get("/game", LoginV);

var userId;
var realUserName;
var loggedIn;

function LoginV(req,res){
    var reqData = req.params;
    var userName = reqData.Name;
    var userPassword = reqData.Password;
   
    let sql = "Select * from Users;"

    con.query(sql, function(err, result){
        if (err) throw err;
        for(var i = 0; i < result.length; i++){
            if(result[i].UserName == userName && result[i].Password == userPassword){
                userId = result[i].UserId;
                realUserName = result[i].UserName;
                loggedIn = true;
                
            }
        }
        console.log("Welcome " + realUserName + " with Id " + userId);
    });
    res.send(realUserName);
}


function setGame(){

}

app.listen(port, () => console.log('Example app listening on port 3000!'));
