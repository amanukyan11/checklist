const Client = require('pg').Client;
const R = require('ramda');

// export function for use in backend code
module.exports = {checkUser, addUser};

// information to connect to the pgsql server
const clientInfo = ({
	host: 'database.colb6htozgeu.us-west-1.rds.amazonaws.com',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'testing!!'
});


// adds a user to the database
// returns a promise, true if successful, else returns false
async function addUser(username, password) {
	// query to send posgreSQL server
	const txt = `INSERT INTO userPass(username, password, treeval) VALUES('${username}', '${password}', 0);`;

	// if user already exists, return false
	const check = await checkUser(username, password);
	if (check)
		return false;

	// connect to server and send query
	// returns a promise that resolves into whether the user exists or not
	const client = new Client(clientInfo);
	await client.connect();
	try {
		const res = await client.query(txt);
	await client.end();
	return true;
	} catch (err) {
		console.log(err.stack);
	}
	client.end();
	return false;
}

// returns a promise, true if user account exists, false otherwise
async function checkUser(username, password) {
	// query to send postgreSQL server
	const txt = `SELECT * FROM userPass
				WHERE username = '${username}' AND password = '${password}';`;

	// connect to server and send query
	// returns a promise that resolves into whether the user exists or not
	const client = new Client(clientInfo);
	await client.connect();
	try {
		const res = await client.query(txt);
	await client.end();
	return !!res.rows[0];
	} catch (err) {
		console.log(err.stack);
	}
}

/*

test code

checkUser('aster', 'pass23!').then(val => console.log(val));

addUser('aaaaaa', 'aaaaaa!').then(val => console.log(val));

addUser('aaaaaa', 'aaaaaa!').then(val => console.log(val));

*/



