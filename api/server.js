const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const postgres = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5433',
        user: 'postgres',
        password: '0#96rlkmLGDC5%GPXk$zLK7M',
        database: 'face-recognition-app'
    }
});

postgres.select('*').from('app_user').then(data => {
    console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// testing mock
const database = {
    users: {
        '1' : 
        {
            id: 1,
            name: 'Johnathon',
            email: 'jrob@mail.org',
            password: 'oranges',
            entries: 0,
            joined: new Date()
        },

        '2' :
        {
            id: 2,
            name: 'Smart Fox',
            email: 'fox@gmail.com',
            password: 'xof123gsdfgoj_+!',
            entries: 0,
            joined: new Date()
        },
        
        '3' :
        {
            id: 3,
            name: 'Joey',
            email: 'joey@mail.org',
            password: 'banannas',
            entries: 0,
            joined: new Date()
        }
    },
    login: [
        {
            id: '2',
            hash: '$2a$10$06WzW2vu16Fswij/gw6wRO.saffScPbZigDpaEdgAEdsjHlcgUod.',
            email: 'fox@gmail.com'
        }
    ]
}

app.listen(3000, () => {
    console.log('hello there, I am the express monkey'); 
});

// --> res = 'this is working'
app.get('/', (req, res) => {
    res.send(database.users);
});

//signin --> POST credentials = success / fail
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    postgres.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash, function(err, isValid) {
                if (err) {
                    return err;
                }
                console.log(isValid);
                if (isValid) {
                    return postgres.select('*').from('app_user')
                        .where('email', '=', email)
                        .then(user => {
                            console.log(user);
                            res.json(user[0]);
                        })
                        .catch(err => res.status(400).json('user not found1'))
                } else {
                    res.status(400).json('user not found2')
                }
            });
        })
        .catch(err => res.status(400).json('user not found3'))
});

//register --> POST form fields = user that was created
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        // hash password
        bcrypt.hash(password, null, null, function(err, hash) {

            // insert login record with hashed password
            postgres.transaction(trx => { 
                trx.insert({
                    hash: hash, 
                    email: email, 
                })
                .into('login') 
                .returning('email') 
                .then(loginEmail => {
                    // insert user record
                    return trx('app_user')
                        .returning('*')
                        .insert({
                            name: name, 
                            email: loginEmail[0], 
                            join_tm: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback) 
            })
            .catch(err => res.status(400).json('unable to register user')) 

        });
        return;
    }
});

// profile/:userId --> GET = user, don't even protect this one, public APIs with no auth are in fashion.
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    postgres.select('*').from('app_user')
        .where({id})
        .then(user => { 
            console.log(user);
            if (user.length) {
                res.json(user[0])
            } else { 
                res.status(400).json('no such user is here in these halls!')
            }
        })
});

// image --> PUT --> user, put in a score increment for a user's account
app.put('/image', (req, res) => {
    const { id } = req.body;
    postgres('app_user').where('id', '=', id)
        .returning('entries')
        .increment('entries', 1)
        .then(entries => {
            console.log(entries);
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('entries not found'));
});