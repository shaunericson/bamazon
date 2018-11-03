var mysql = require("mysql");

var config = require("./configure.js");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: config.password,
    database: "bamazon"
});


connection.connect(function (err) {
    if (err) throw err;

    readProducts();
    
})

function readProducts() {
    // console.log("Selecting all products...");
    // console.log("Item ID | Product Name | Department | Price ")

    connection.query("select * from products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " -- Product Name: " + res[i].product_name
                + " -- Department: " + res[i].department_name + " -- Price: " + res[i].price
                + " -- Stock Quantity: " + res[i].stock_quantity);
        }
        // connection.end();
        bamazon();
        // count++;
        // displayProducts();
    })
};

function bamazon() {

    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Please input item ID you would like to buy?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function (answer) {
            connection.query("select stock_quantity from products where ?",
                [
                    {
                        item_id: answer.item
                    }
                ], function (err, res) {

                    if (err) throw err;

                    if (parseInt(answer.quantity) < res[0].stock_quantity) {
                        // if (1 < 2) {
                        // console.log("Working");
                        var newInventory = res[0].stock_quantity - parseInt(answer.quantity);
                        connection.query("update products set ? where ?",
                            [
                                {
                                    stock_quantity: newInventory
                                },
                                {
                                    item_id: answer.item
                                }
                            ], function (err, res) {
                                if (err) throw err;
                                // console.log(res.affectedRows + " products updated!\n");
                                console.log("Thank you for your purchase!")
                                // console.log(res);
                                readProducts();
                            }
                        )
                        // console.log(parseInt(answer.quantity));
                        // console.log(res[0].stock_quantity)
                    } else {
                        console.log("Not enough stock for purchase!")
                        bamazon();
                    }
                })
        });
}

