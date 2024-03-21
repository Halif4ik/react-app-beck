# Task Back-end for React app RADENCY
## Description:
First of all we created Get/POST routes with simple response.
You can check on this endpoint- http://localhost:3001/.
Tou need create .env file and add into it contein with vars as in sample file.
Start the application.
```
yarn install

nest start --watch
```
## Docker
If you would like start this app with DB  in Docker make next steps:

For run application in Docker Compose with database execute next command:
```
docker compose up
```
But in default application use local DB. If you would like to use Docker DB,
you need to change the connection to the database in the .env file.