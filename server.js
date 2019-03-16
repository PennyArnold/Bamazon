

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: 'John2012',
    database: 'Bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id ", connection.threadId);
    makeTable();
})

var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
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

var promptCustomer = function (res) {
    inquirer.prompt({
        type: 'input',
        name: 'choice',
        message: 'What would you like to purchase? [Quit with Q]'
    }).then(function (answer) {
        var correct = false;
        if (answer.choice.toUpperCase() == "Q") {
            connection.end();
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].productname === answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to buy?',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if ((res[id].stockquantity - answer.quantity) > 0) {
                        var quantity = (res[id].stockquantity - answer.quantity);
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                stockquantity: quantity
                            },
                            {
                                productname: product
                            }
                        ], function (err, res2) {
                            if (err) throw err;
                            var totalPrice = res[id].price * answer.quantity;
                            console.log('Product Purchased for $' + totalPrice + '.');
                        })
                        makeTable();
                    } else {
                        console.log("This is not a valid selection.");
                        promptCustomer(res);
                    }
                })
            }
        }
        if (i == res.length && correct == false) {
            console.log('This is not a valid selection.');
            promptCustomer(res);
        }

    });

}