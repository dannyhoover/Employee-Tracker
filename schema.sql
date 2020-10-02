drop database if exists employee_tracker;
create database employee_tracker;
use employee_tracker;
create table departments(
	id int auto_increment not null, 
    name varchar(30) not null,
    primary key(id)
);

create table roles(
	id int auto_increment not null,
    title varchar(30) not null,
    salary decimal(10, 2) not null,
    department_id int not null,
    primary key(id),
    foreign key(department_id) references departments(id)
);

create table employees(
	id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int null,
    primary key(id),
    foreign key(role_id) references roles(id),
    foreign key(manager_id) references employees(id)
);