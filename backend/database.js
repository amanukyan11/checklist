const Client = require('pg').Client;
const R = require('ramda');

// export function for use in backend code
module.exports = {authenticateUser, addUser};

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
	const txt = `INSERT INTO user_info (email, password) 
				VALUES ($1, crypt($2, gen_salt('bf')))`;
	const vals = [username, password]
	// connect to server and send query
	// returns a promise that resolves into whether the user exists or not
	
    const client = new Client(clientInfo);
	client.connect();
	
    try {
		const res = await client.query(txt, vals);
	await client.end();
	return { "status": 0 };
	} catch (err) {
		console.log(err.stack);
	}
	client.end();
	return { "status": 1 };
}

async function authenticateUser(email, passwordAttempt) {
	const txt = `SELECT userID
	FROM user_info
	WHERE email=$1
	AND password=crypt($2,password)`
	const vals = [email, passwordAttempt]

	const client = new Client(clientInfo);
	client.connect();
	
    try {
		const res = await client.query(txt, vals);
		await client.end();
		return { "userID": res.rows[0] };
	} catch (err) {
		console.log(err.stack);
	}
	client.end();
	return { "userID": null };
}

/*

test code

checkUser('aster', 'pass23!').then(val => console.log(val));

addUser('aaaaaa', 'aaaaaa!').then(val => console.log(val));

addUser('aaaaaa', 'aaaaaa!').then(val => console.log(val));

*/



