USE bamazon; 
INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Pacman", "Video Games", 95,150),
	("Mario Cart", "Video Games",99,200),
    ("Chicken Soup", "Food and Drink", 50,50),
    ("Levis", "Apparel",10,5),
    ("Tennis skirt", "Apparel", 25,35),
    ("Toilet Paper", "Necessities", 42,42),
    ("Napolean Dynamite", "Films", 10,25),
    ("Office Space", "Films", 50,57),
    ("Sorry", "Board Games", 50,35),
    ("Spoons", "Board Games", 95,25);
    
    select * FROM bamazon.products;
   
