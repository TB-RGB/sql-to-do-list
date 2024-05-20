# SQL To-Do App


## Description

_Duration_: Weekend Project

Demonstration in building a CRUD app, allowing:
- user input to add to a database
- update values in the database
- delete from the database
- rendering from database upon load and upon changes made


## Screenshot
![todo app](./images/Screenshot%202024-05-20%20at%2010.34.25 AM.png)
### Prerequisites
- [PostgreSQL](https://www.postgresql.org/download/)
- [Postico](https://eggerapps.at/postico/v1.php) (_or another way to interact with database for setup_)
- [Node.js](https://nodejs.org/en/download/package-manager/current)
- [Express](https://www.npmjs.com/package/express) (install via npm i)
- [node-postgres](https://www.npmjs.com/package/pg) (install via npm i)

## Installation

1. Create a database named `weekend-to-do-app`
2. The queries within `database.sql` will be all that is needed to create the necessary tables and populate the needed data to render the tasks to the DOM. This was built using PostgreSQL and Postico to run the queries.
3. Open this repo up in an IDE and run `npm install` in the terminal
4. Run `npm run server` 
    - **Note** this project used [nodemon](https://www.npmjs.com/package/nodemon) for server management, but it is not a dependancy in the `package.json`. If not using nodemon you will need to change the `server` script to say `node server/server.js`
5. Visit `localhost:5001` in your browser to interact with the app

## Usage

1. Visit `localhost:5001`
2. All current tasks and their completion status will be rendered in the app
3. To add a new task to the list, use the input form at the bottom of the list and hit the `+` button
    - this sends a POST request and INPUT query
4. To mark a task complete, click anywhere on the task and the checkbox will indicate it as completed and the text will be crossed out. This can be undone by clicking on it again.
    - this sends a PUT request and UPDATE query
5. To remove from the list, hit the purple `Delete` button on the right of the task.
    - this sends a DELETE request and query