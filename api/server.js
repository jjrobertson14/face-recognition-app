const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// testing mock
const database = {
    users: {
        "1" : 
        {
            name: 'Johnathon',
            email: 'jrob@mail.org',
            password: 'oranges',
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
            password: 'banannas',
            entries: 0,
            joined: new Date()
        }
    },
    login: [
        {
            id: "2",
            hash: "$2a$10$06WzW2vu16Fswij/gw6wRO.saffScPbZigDpaEdgAEdsjHlcgUod.",
            email: 'fox@gmail.com'
        }
    ]
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
        // Load hash from your password DB.
        bcrypt.compare("bacon", '$2a$10$06WzW2vu16Fswij/gw6wRO.saffScPbZigDpaEdgAEdsjHlcgUod.', function(err, res) {
            console.log('first guess: ', res);
        });
        bcrypt.compare("veggies", '$2a$10$06WzW2vu16Fswij/gw6wRO.saffScPbZigDpaEdgAEdsjHlcgUod.', function(err, res) {
            console.log('second guess: ', res);
        });
        
        if (email === database.users["1"].email && password === database.users["1"].password) {
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
        var hashedPassword = bcrypt.hash(password, null, null, function(err, hash) {
            console.log(hash);
            return hash;
        });

        const id = "4";
        if (!database.users[id]) {
            database.users[id] = {
                id: 4,
                name: name,
                email: email,
                password: hashedPassword,
                entries: 0,
                joined: new Date()
            };
        }
        res.json(database.users[id]);
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