const Client = require('pg').Client;
const database = require('./database.js')

const clientInfo = ({
	host: 'database.colb6htozgeu.us-west-1.rds.amazonaws.com',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'testing!!'
});

// FOR TESTING PURPOSES ONLY
async function deleteUser(email) {
	const txt = `DELETE FROM user_info WHERE email = $1`;
	const vals = [email];

	client = new Client(clientInfo);
	client.connect();
	try {
		await client.query(txt, vals);
	} catch (e) {
		console.log(e.stack);
	} finally {
		client.end();
	}
}

// FOR TESTING PURPOSES ONLY
async function deleteLists(email) {
	const txt = `DELETE FROM checklists WHERE user`;
	const vals = [email];

	client = new Client(clientInfo);
	client.connect();
	try {
		await client.query(txt, vals);
	} catch (e) {
		console.log(e.stack);
	} finally {
		client.end();
	}
}

async function deleteUser(email) {
	const txt = `DELETE FROM user_info WHERE email = $1`;
	const vals = [email];

	client = new Client(clientInfo);
	client.connect();
	try {
		await client.query(txt, vals);
	} catch (e) {
		console.log(e.stack);
	} finally {
		client.end();
	}
}


async function test() {
	const errorMsg = (email, pwd) => { return `${email}, ${pwd} failed` };
	let email = 'john';
	let pwd = 'success';
	await deleteUser(email).catch((e) => console.log(e.stack));
	await database.addUser(email, pwd).then((res) => console.assert(res["userid"] !== null, errorMsg(email, pwd)));
	pwd = 'fail'
	await database.addUser(email, pwd).then((res) => console.assert(res["userid"] === null, errorMsg(email, pwd)));

	
	
	email = 'raine@mail.com'
	pwd = 'raine'
	
	await database.authenticateUser(email, pwd).then((res) => console.assert(res["userid"] !== null, errorMsg(email, pwd)));
	
	email = 'aster@mail.com';
	pwd = 'jiho';
	await database.authenticateUser(email, pwd).then((res) => console.assert(res["userid"] === null, errorMsg(email, pwd))).catch((e) => console.log(e.stack));

	let asterID = await database.authenticateUser('aster@mail.com', 'aster').then((res) => { return res["userid"] });
	await database.getUserInfo(asterID).then(res => console.assert(res["lists"][0]["content"][0] === 'do thing one' &&
																			res["lists"][1]["name"] === "Aster's First List" &&
																				res["lists"][3]["checked"][1] === false));
	let name = "testlist";
	let content = ["a", "b", "c"];
	let checked = [true, true, true];
	await database.createChecklist(asterID, name, content, checked).then(res => console.assert(res["listid"] !== null));
}


test();
