// import modules
const express = require("express");

// set up express
const app = express();

// import backend functions to manipulate PostgreSQL server
const database = require('./database.js');

// Default message when visiting http://localhost:5000
app.get("/", (req, res) => {
	res.send('Server is up!');
});

/*

// checks if a user has signed up already
// replies with a promise containing true or false
// no longer necessary
app.get('/checkUser/:username/:password', async (req, res) => {
	const username = req.params.username;
	const password = req.params.password;
	const respomse = await database.checkUser(username, password);
	const ret = JSON.stringify(response);
	res.send(ret);
});

*/

// adds a user if they have not already signed up
// returns JSON object with either null userid or nonnull
app.get("/addUser/:email/:password", async (req, res) => {
	const email = req.params.email;
	const password = req.params.password;
	const response = await database.addUser(email, password);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// checks if user exists based on email and password
// returns JSON object with either null userid or nonnull
app.get("/authenticateUser/:email/:password", async (req, res) => {
	const email = req.params.email;
	const password = req.params.password;
	const response = await database.authenticateUser(email, password);
	const ret = JSON.stringify(response);
	res.send(ret);
});

//returns JSON object with user information
app.get("/getUserInfo/:userID", async (req, res) => {
	const userID = req.params.userID;
	const response = await database.getUserInfo(userID);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// creates a new checklist
//returns JSON object with name of checklist, or null if failure
app.get("/createChecklist/:userID/:listName/:newContent/:newChecked", async (req, res) => {
	const userID = req.params.userID;
	const listName = req.params.listName;
	const newContent = JSON.parse(req.params.newContent);
	const newChecked = JSON.parse(req.params.newChecked);
	const response = await database.createChecklist(userID, listName, newContent, newChecked);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// updates existing checklists
// if successful, returns JSON object with information about checklist
// else, returns {status: 1}
app.get("/updateChecklist/:listID/:listName/:newContent/:newChecked", async (req, res) => {
	const listID = req.params.listID;
	const listName = req.params.listName;
	const newContent = JSON.parse(req.params.newContent);
	const newChecked = JSON.parse(req.params.newChecked);
	const response = await database.updateChecklist(listID, listName, newContent, newChecked);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// allows users to share a list with the inputted email
// on success, returns JSON object with list id and userid of sharee
// else, returns {status: 1}
app.get("/shareList/:listID/:newEmail", async (req, res) => {
	const listID = req.params.listID
	const newEmail = req.params.newEmail;
	const response = await database.shareList(listID, newEmail);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// grows a user tree by inputted amount
// returns JSON object with new tree progress
app.get("/growTree/:userID/:amount", async (req, res) => {
	const userID = req.params.userID;
	const amount = req.params.amount;
	const response = await database.growTree(userID, amount);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// deletes a user's checklist
// returns JSON object with status set to 0 or 1
app.get("/deleteChecklist/:listID", async (req, res) => {
	const listID = req.params.listID;
	const response = await database.deleteChecklist(listID);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// deletes an existing user
// returns JSON object with number of deleted lists and users
// if failed, number of deleted users is 0
app.get("/deleteUser/:userID", async (req, res) => {
	const userID = req.params.userID;
	const response = await database.deleteUser(userID);
	const ret = JSON.stringify(response);
	res.send(ret);
});

// tells app to listen to requests to port 5000
app.listen(5000, () => {
	console.log("Server started successfully");
});
