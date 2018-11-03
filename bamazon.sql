drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price decimal (10,2) NULL,
    stock_quantity int null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("basketabll", "sports", 19.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("baseball", "sports", 1.99, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("gold ball", "sports", 0.99, 150);

insert into products (product_name, department_name, price, stock_quantity)
values ("football", "sports", 19.99, 75);

insert into products (product_name, department_name, price, stock_quantity)
values ("soccer ball", "sports", 19.99, 125);

select * from products