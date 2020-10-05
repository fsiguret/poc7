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
npm start server
```

##if not images folder

create the "images" folder in the "backend" folder.

##Create Database and Tables

execute the command line in your Mysql terminal

```
SOURCE path_to_your_project/sql/createDBAndTable.sql
```

## User Privileges 

add manually the rank of the user

```
UPDATE Users
SET rank = the_rank_were_you_want WHERE userId = the_id_of_user;
```

```
rank            |
--------------------------
default         | 0 
--------------------------
administrator   | 4
``` 


# Frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
