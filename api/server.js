const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// testing mock
const database = {
    users: {
        "1" : 
        {
            name: 'Johnathon',
            email: 'jrob@mail.org',
            password: 'hashed-I-swear',
            entries: 0,
            joined: new Date()
        },

        "2" :
        {
            name: 'Smart Fox',
            email: 'fox@gmail.com',
            password: 'xof123gsdfgoj_+!',
            entries: 0,
            joined: new Date()
        },
        
        "3" :
        {
            name: 'Joey',
            email: 'joey@mail.org',
            password: 'super-hashed',
            entries: 0,
            joined: new Date()
        }
    }
}

app.listen(3000, () => {
    console.log("hello there, I am the express monkey"); 
});

// --> res = 'this is working'
app.get('/', (req, res) => {
    res.send(database.users);
});

//signin --> POST credentials = success / fail
app.post('/signin', (req, res) => {
    let email = req.body && req.body.email;
    let password = req.body && req.body.password;
    if (email && password) {
        if (email === database.users[0].email && password === database.users[0].password) {
            res.json('success');
            return;
        }
    }
    res.status(400).json('failure');
});

//register --> POST form fields = user that was created
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        database.users.push({
            id: 4,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        })
        res.json(database.users[database.users.length - 1]);
        return;
    }
    res.status(400).json('failure');
});

// profile/:userId --> GET = user, don't even protect this one, public APIs with no auth are in fashion.
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    var user = database.users[id];
    if (user) {
        return res.json(user);
    } else {
        return res.status(400).json('no such user is here in these halls!');
    }
});

// image --> PUT --> user, put in a score increment for a user's account
app.put('/image', (req, res) => {
    var id  = req.body && req.body.id;
    var user = database.users[id];
    if (user) {
        user.entries++;
        return res.json(user.entries);
    } else {
        return res.status(400).json('no such user is here in these halls!');
    }
});