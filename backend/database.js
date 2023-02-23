const Client = require('pg').Client;
const R = require('ramda');

// export function for use in backend code
module.exports = {authenticateUser, addUser, getUserInfo, createChecklist};

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
				VALUES ($1, crypt($2, gen_salt('bf')))
				RETURNING userID`;
	const vals = [username, password];
	// connect to server and send query
	// returns a promise that resolves into whether the user exists or not
	
    const client = new Client(clientInfo);
	await client.connect();
	let userID = null;
    try {
		const res = await client.query(txt, vals);
		userID = res.rows[0];
	} catch (err) {
		console.log(err.detail);
	} finally {
		await client.end();
		return { "userid": userID };
	}
	
}

async function authenticateUser(email, passwordAttempt) {
	const txt = `SELECT userID
	FROM user_info
	WHERE email=$1
	AND password=crypt($2,password)`;
	const vals = [email, passwordAttempt];

	const client = new Client(clientInfo);
	await client.connect();
	let userID = null;
    try {
		const res = await client.query(txt, vals);
		await client.end();
	
		if (res.rows.length){
			userID = res.rows[0]["userid"];
		}
	} catch (err) {
		console.log(err.stack);
	} finally {
		await client.end();
		return { "userid" : userID};
	}
	
}

async function getUserInfo(userID) {
	const listsQuery = `
		SELECT checklists.listID, checklists.name, checklists.content, checklists.checked
		FROM checklists
		JOIN perms
		ON checklists.listID = perms.listID
		WHERE perms.userID::text = $1
	`;
	const userQuery = `
		SELECT email, tree_prog
		FROM user_info
		WHERE userID::text = $1
	`;
	const values = [userID];
	

	const client = new Client(clientInfo);
	await client.connect();
	let lists;
	let userInfo;
	try {
		await client.query(listsQuery, values).then(res => lists = res.rows);
		await client.query(userQuery, values).then(res => userInfo = res.rows);
	} catch (err) {
		console.log(err)
	} finally {
		await client.end();
	}

	if (!userInfo.length) {
		return { "status": 1};
	}
	const ret = {
		...userInfo[0],
		"lists": lists
	}
	return ret;
}

async function createChecklist(userID, listName, newContent, newChecked) {

	const query = `
		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ($2, $3, $4)
		RETURNING listID)

		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id), $1)
		RETURNING listID
	`;
	const values = [userID, listName, newContent, newChecked];

	const client = new Client(clientInfo);
	await client.connect();
	let listID = null
	try {
		await client.query(query, values).then(res => listID = res.rows[0]["listid"]);
	} catch (e) {
		console.log(e.stack);
	} finally {
		await client.end();
		return { "listid": listID };
	}

}

/*

test code

checkUser('aster', 'pass23!').then(val => console.log(val));

addUser('aaaaaa', 'aaaaaa!').then(val => console.log(val));

addUser('aaaaaa', 'aaaaaa!').then(val => console.log(val));

*/



