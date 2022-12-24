// Task1: initiate app and run server at 3000
var express = require("express");
var Bodyparser = require("body-parser");
var Mongoogse = require("mongoose");
var cors = require("cors");

//const { default: mongoose } = require("mongoose");
//const { employeeModel } = require("./models/employee");

var app = new express();
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({ extended: false }));
app.use(cors());

const path=require('path');
const employeeModel = require("./model/employee");
//app.use(express.json());
//app.use(express.urlencoded([extended, true]));
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection
//const mongoose = require("mongoose");
//const EmployeeData = require('./models/employee');
Mongoogse.connect("mongodb+srv://vrinda:12345@cluster0.ng3xsrn.mongodb.net/EmployeeData?retryWrites=true&w=majority",
{ useNewUrlParser: true });




//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', (req, res) => {

    employeeModel.find((err, employee) => {

        res.send(employee);
    });
    console.log("Employees Details are shown")
});





//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id', async (req, res) => {
    let id = req.params.id;
    employeeModel.findOne({ _id: id }, (err, employee) => {
        res.send(employee);
    });
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


app.post('/api/employeelist', async (req, res) => {
    let data = req.body;
    let employee = new employeeModel(data);
    await employee.save(
        (err, data) => {
            if (err) {
                res.json({ "Status": "Error", "Error": err });
            } else {
                res.json({ "Status": "Success", "Data": data });
            }
        })
    console.log("Data Successfully added");
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id", (req, res) => {
    let data = req.body;
    id = req.params.id;
    employeeModel.findByIdAndDelete({ "_id": id }, data, (err, data) => {
        if (err) {
            res.json({ "Status": "Error", "Error": err })
        } else {
            res.json({ "Status": "deleted", "Data": data })
            console.log("data successfully deleted");
        }
    });
});
      



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', (req, res) => {

    let data = {
        name: req.body.name,
        location: req.body.location,
        position: req.body.position,
        salary: req.body.salary
    }
    let name = req.body.name;

    employeeModel.findOneAndUpdate({ "name": name }, data, (err, data) => {
        if (err) {
            res.json({ "Status": "Error", "Error": err });
        } else {
            res.json({ "Status": "Updated", "Data": data });
        }
    });
    console.log("Data successsfully updated");
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
app.listen(3000, () => {
    console.log("server started listening to port 3000");
});


