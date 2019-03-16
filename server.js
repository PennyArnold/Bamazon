//Required dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//creates the connection to sql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'John2012',
    database: 'Bamazon'
})
//lets me know if we have a connection and if not, throws an error 
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id ", connection.threadId);
    makeTable();

    connection.end();
})
//collects all of the data from my table in sql and prints it to the terminal
var makeTable = function () {
    connection.query('SELECT * FROM products', function (_err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].itemid + " || " +
                res[i].productname + " || " +
                res[i].departmentname + " || " +
                res[i].price + " || " +
                res[i].stockquantity + "\n");
        }
        promptCustomer(res);
    })
}
//function so that the user can select an option from the table data and purchase it from the terminal
var promptCustomer = function (res) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What would you like to purchase? [Quit with Q]'
    }]).then(function (answer) {
        var correct = false;
        //exits if the user types Q
        if (answer.choice.toUpperCase() === "Q") {
            process.exit();
        }
        //loops through response from query input
        for (var i = 0; i < res.length; i++) {
            if (res[i].productname === answer.choice) {
                console.log(res[i].productname);
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: 'How many would you like to buy?',
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if ((res[id].stockquantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stockquantity= " + (res[id].stockquantity - answer.quantity) + "' WHERE productname='" + product + "'", function (_err, res2) {
                            console.log('Product Purchased!');
                            makeTable();
                        })
                    } else {
                        console.log("This is not a valid selection.");
                        promptCustomer(res);
                    }
                })
            }
        }
        if (i === res.length && correct === false) {
            console.log("This is not a valid selection.");
            promptCustomer(res);
        }
    })
}