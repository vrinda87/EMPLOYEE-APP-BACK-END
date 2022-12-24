const { default: mongoose } = require("mongoose");
let Mongoogse = require("mongoose");


const employeeSchema =  Mongoogse.Schema(
    {
        name: String,
        position: String,
        location: String,
        salary: Number
    }
);

let employeeModel = Mongoogse.model("details", employeeSchema);
module.exports = employeeModel;