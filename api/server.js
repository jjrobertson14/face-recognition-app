const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log("hello there, I am the express monkey"); 
});

app.get('/', (req, res) => {
    res.send('this is working');
});

/*
/ --> res = 'this is working'
/signin --> POST credentials = success / fail
/register --> POST form fields = user that was created
/profile/:userId --> GET = user, don't even protect this one, public APIs with no auth are in fashion.
/image --> PUT --> user, put in a score increment for a user's account
*/

