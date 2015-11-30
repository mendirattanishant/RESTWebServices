drop database eskimo;
create database eskimo;
use eskimo;

create table users (user_id int auto_increment primary key,
email_id varchar(30), password varchar(15));

Alter table users auto_increment = 0;

create table events (event_id int auto_increment primary key,
user_id varchar(30), location varchar(100), date date, live varchar(3),
start_time datetime, end_time datetime);


create table event_attendees (event_id int, user_id int);

create table ski_event (event_id int, user_id int, ski_id varchar(30)
primary key, ski_start_time time, ski_stop_tiUsersme time,
ski_distance float);

SET SQL_SAFE_UPDATES = 0;
