#Backend

##Project setup

```
npm install
```

##Start server

```
nodemon run server
```

or

```
npm run server
```

##if not images folder

create the "images" folder in the "backend" folder.

##Create Database and Tables

execute the command line in your Mysql terminal

```
SOURCE path_to_your_project/sql/createDBAndTable.sql
```

##Fill the tables Articles/Users/Commentary if you want

```
SOURCE path_to_your_project/sql/fillDatabase.sql
```

## User Privileges 

add manually the rank of the user

```
UPDATE Users
SET rank = the_rank_were_you_want;
```

```
rank            |
--------------------------
default         | 0 
--------------------------
administrator   | 4
``` 

