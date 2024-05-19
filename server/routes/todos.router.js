const router = require('express').Router();
const pool = require('../modules/pool');

// ? GET Route for rendering DB values to dom, etc.

router.get('/', (req, res)=>{
    let queryText = `SELECT * FROM "todos" ORDER BY "id";`

    pool.query(queryText)
        .then((result)=>{
            res.send(result.rows)
        })
        .catch((err)=>{
            console.error('Error in GET request', err)
            res.sendStatus(500)
        })
})


// ? POST route for adding new to-do item to DB

router.post('/', (req, res)=>{
    let newTask = req.body;
    let taskArray = [newTask.text];


    let queryText = `INSERT INTO "todos" ("text")
    VALUES ($1);
    `;

    pool.query(queryText, taskArray)
        .then((result)=>{
            res.sendStatus(201)
        })
        .catch((err)=>{
            console.error('Error adding to to-do list', err)
            res.sendStatus(500)
        })
})

// ? PUT route to update task as completed
    // ! Added ability to un-mark as compplete to allow the new css styling that is able to be toggled on and off

router.put('/task/:id', (req, res)=>{
    let taskId = req.params.id;
    let isComplete = req.body.isComplete;

    let queryText = ''

    if (isComplete === true){
        queryText = `
        UPDATE "todos" SET "isComplete"=true
        WHERE "id"=$1;
        `
    } else if (isComplete === false){
        queryText = `
        UPDATE "todos" SET "isComplete"=false
        WHERE "id"=$1;
        `
    } 
    else {
        console.error('Trouble marking complete')
        res.sendStatus(500)
    }

    pool.query(queryText, [taskId])
        .then((response)=>{
            res.sendStatus(204)
        })
        .catch((err)=>{
            console.error('Error making query:', queryText, 'error:', err)
            res.sendStatus(500)
        })
})

// ? DELETE route for removing task from list

router.delete('/:id', (req, res)=>{
    let taskId = req.params.id;
    let queryText = `
    DELETE FROM "todos" WHERE "id"=$1;
    `;

    pool.query(queryText, [taskId])
        .then((response)=>{
            res.sendStatus(204)
        })
        .catch((err)=>{
            console.error('Error making query:', queryText, 'error:', err)
            res.sendStatus(500)
        })
})

module.exports = router;
