var express = require('express');
var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'halleinapp'
});

connection.connect();
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/tokengen', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if (!username || !password) return;
    connection.query("SELECT id FROM users WHERE username = '" + username + "' && password = '" + password + "'", function (err, rows) {
        var data;
        if (err) res.status(500);
        else if (rows.length) {
            data = generateToken(rows[0].id);
        }
        else res.status(400);
        res.json(data);
    });
});

function generateToken(id) {
    var token = Math.random().toString(36).substr(2);
    connection.query("UPDATE users SET token = '" + token + "' WHERE id = " + id);
    return {id: id, token: token};
}

app.get('/users', function (req, res) {
    var id = '%';
    var username = '%';
    var group = '%';
    var email = '%';
    if (req.query.id) {
        id = req.query.id;
    }
    if (req.query.username) {
        username = req.query.username
    }
    if (req.query.group) {
        group = req.query.group;
    }
    if (req.query.email) {
        email = req.query.email;
    }
    var data;
    connection.query('SELECT users.id, users.username, groups.name AS `group`, users.lastLogin FROM users LEFT JOIN groups ON users.group = groups.id WHERE users.id like ? && users.username like ? && users.group like ? && users.email like ?', [id, username, group, email], function (err, rows) {
        if (err) data = err;
        else data = rows;
        res.json(data);
    });
});

app.delete('/users', function (req, res) {
    var id = req.query.id;
    if (!id) return;
    connection.query('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) res.status(500);
        res.send();
    });
});

app.post('/users', function (req, res) {
    var username = req.query.username;
    var group = req.query.group;
    var email = req.query.email;
    var password = req.query.password;
    if (!username || !group || !email || !password) return;
    connection.query('INSERT INTO users (username, `group`, email, password) VALUES (?,?,?,?)', [username, group, email, password], function (err, result) {
        var data;
        if (err) res.status(500);
        else data = {id: result.insertId};
        res.json(data);
    });
});

app.get('/feedback', function (req, res) {
    var id = '%';
    var user = '%';
    var accepted = '%';
    if (req.query.id) {
        id = req.query.id;
    }
    if (req.query.user) {
        user = req.query.user;
    }
    if (req.query.accepted) {
        accepted = req.query.accepted;
    }
    connection.query('SELECT id, user, subject, rating, text, created, accepted FROM feedback WHERE id like ? && user like ? && accepted like ?', [id, user, accepted], function (err, rows) {
        var data;
        if (err) res.status(500);
        else if (rows.length) {
            data = rows;
        }
        else res.status(400);
        res.json(data);
    });
});

app.listen(3000, function () {
    console.log('Server running at http://localhost:3000/');
});