The application allows to work with a list of users. Each user has a unique ID, name and rank.

The application is written in Typescript, database - PostgreSQL, runtime - Node.JS.
Used framework Express and ORM - TypeORM.

Application launch - function bootstrap in file index.ts(or npm run start).
When the application starts, an instance of the TypeORM usage class is created and the server is started.

Used middlewares:
 - bodyParser from 'body-parser';
 - error handler;
 - input data validator.

Error handler - function errorMiddleware, that allows to handle errors, pass the specified server response code and message.
Data validator is a function validationMiddleware, that validates input data and based on DTO files.

The application allows:
 - to get get a list of users and sort according to the criteria specified in the request (name or rank)(route localhost:3000/users/list);
 - to change the rank of a user and return an updated list of users sorted by rank ( route localhost:3000/users/changerank);
 - to add user(route localhost:3000/users/add);
 - to delete user(route localhost:3000/users/delete);
 - to update user(route localhost:3000/users/update).

 When processing routes, an instance of the TypeOrmConnects class is used with the corresponding methods.

Time usage report:
 - thinking over the architecture, installing initial modules and creating a table in the database: 1 hour;
 - setting up validation, error handler and router: 1,5 hours;
 - writing a controller for processing routes: 1,5 hours;
 - writing methods for working with the database: 1,5 hours;
 - fine-tuning: 1 hour;
Total 6,5 hours.

Data to create a table in database PostgreSQL:

CREATE TABLE Users
( id_USER SERIAL PRIMARY KEY,
  name CHARACTER VARYING(20) NOT NULL UNIQUE,
  runk INTEGER NOT NULL );
    
INSERT INTO Users(name, runk) 
VALUES ('aaa',1), ('bbb',2),('ccc',3),('ddd',4),('eee',5),('fff',6),('ggg',7);

