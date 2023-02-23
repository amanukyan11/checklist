// import modules
const express = require("express");

// set up express
const app = express();

// import backend functions to manipulate PostgreSQL server
const backend = require('./database.js');

// Default message when visiting http://localhost:5000
app.get("/", (req, res) => {
	res.send('Server is up!');
});

/*

// checks if a user has signed up already
// replies with a promise containing true or false
app.get('/checkUser/:username/:password', async (req, res) => {
	const username = req.params.username;
	const password = req.params.password;
	const ret = await backend.checkUser(username, password);
	res.send(ret);
});

*/

// adds a user if they have not already signed up
// replies with a promise containing true or false if successful
// also returns false if a duplicate username exists
app.get("/addUser/:username/:password", async (req, res) => {
	const username = req.params.username;
	const password = req.params.password;
	const ret = await backend.addUser(username, password);
	res.send(ret);
});

app.listen(5000, () => {
	console.log("Server started successfully");
});
