# Bamazon

This is a MySQL Database that uses Node.JS terminal to display prompts to view and purchase products.

MySQL database contains a table of products to display to the user and includes: 
- Item ID (unique id for each product) 
- Product Name (Name of product) 
- Department Name - Price (cost to customer) 
- Stock Quantity (how much of the product is available in stores)

The MSQL database contains 10 different products.

The server.js file runs the Node.js application and displays all items available for sale including the ids, names, and prices of products for sale.

After the table displays, the user is prompted to: 
- chose an item to purchase 
- chose the amount of that item (quantity)

Once the user selects the desired product, the terminal displays the total amount of the item(s) purchased and the user is informed that the purchase at the total price was successful.

Once a product is purchased, the amount in stock deducts the number of items purchased and updates the SQL database to reflect the remaining quantity.

If the user selects a product that is not in the database or selects an amount that is more than in stock, they receive a message, “"This is not a valid selection."

See the demonstration video (Bamazon Demonstration.webm] in this repository.

### Requirements
  - MySQL
  - Inquirer

### Languages and Runtimes

- Javascript
- Node JS
- MySQL
