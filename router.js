const express = require("express")
const route = express.Router()
const mySQL = require("mysql")

const sabzlearn = mySQL.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sabzlearn"
})

sabzlearn.connect((err)=>{
    if(err){
        console.log("Error!!")
    }
})

route.post("/Register" , (req , res)=>{
    let {firstname , lastname , username , password} = req.body
    let query = "INSERT INTO `register` (firstname ,lastname ,username ,password) VALUES(?,?,?,?)"
    let value = [firstname , lastname , username , password]
    sabzlearn.query(query , value , (err , resulte)=>{
        if (err){
            console.log("Wrong!!")
        }else{
            res.send("User Successfully Registered")
        }
    })
})

route.put("/RegisterUser", (req,res)=>{
    let query = "SELECT * FROM `register`"
    sabzlearn.query(query , (err , resulte)=>{
        if (err){
            console.log("Wrong!!")
        }else{
            res.send(resulte)
        }
    })
})

route.delete("/RemoveUser", (req, res) => {
    const username = req.body.username;
    
    if (!username) {
        return res.status(400).send("Username is required");
    }
    
    const query = "DELETE FROM `register` WHERE `username` = ?";
    sabzlearn.query(query, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("User was removed");
    });
});

route.put("/EditUser" , (req , res)=>{
    const id = req.body.id
    const query = "SELECT * FROM `register` WHERE ID=?"
    sabzlearn.query(query , [id] , (err , resulte)=>{
        if (err){
            console.log("Wrong!!")
        }else{
            res.send(resulte)
        }
    })
})

route.post("/UpdateUserInformation", (req, res) => {
    let { id, firstname, lastname, username, password } = req.body;
    let query = "UPDATE `register` SET firstname=?, lastname=?, username=?, password=? WHERE id=?";
    let values = [firstname, lastname, username, password, id];
    
    sabzlearn.query(query, values, (err, result) => {
        if (err) {
            console.log("Error updating user information:", err);
            res.status(500).send("Error updating user information");
        } else {
            res.send("User information updated");
        }
    });
});


module.exports = route