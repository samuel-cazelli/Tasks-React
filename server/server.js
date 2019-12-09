var sqlite3 = require('sqlite3').verbose();
var assert = require("assert").ok;

let db = new sqlite3.Database("database.db");

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS Tasks (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Task  TEXT NOT NULL, Date TEXT NOT NULL, Complete INTEGER NOT NULL)");
});

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/list-tasks', (req, res) => {

    db.serialize(function () {
        db.all("SELECT Id as id, Task as task, Date as date, Complete as complete FROM Tasks WHERE Date = ?",
            new Date(req.query.date).toISOString(), function (err, records) {
                res.send(records);
            });
    });
});

app.post('/api/add-task', (req, res) => {
    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO Tasks(Task, Date, Complete) VALUES (?, ?, ?);");
        stmt.run(req.body.task, new Date(req.body.date).toISOString(), req.body.complete);
        stmt.finalize();
    });

    res.send('ok');
});

app.post('/api/update-task', (req, res) => {
    db.serialize(function () {
        db.run(
            'UPDATE Tasks SET Task = ?, Date = ?, Complete = ? WHERE Id = ?; ',
            [req.body.task, new Date(req.body.date).toISOString(), req.body.complete, req.body.id],
            function (err) {
                db.get(
                    ' SELECT Id as id, Task as task, Date as date, Complete as complete FROM Tasks WHERE Id = ?;'
                    , [req.body.id]
                    , function (err, row) {
                        console.log(row);
                        res.send(row);
                    });
            });
    });
});

app.post('/api/complete-task', (req, res) => {
    db.serialize(function () {
        db.run(
            'UPDATE Tasks SET Complete = ? WHERE Id = ?; ',
            [req.body.complete, req.body.id],
            function (err) {
                res.send('ok');
            });
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));