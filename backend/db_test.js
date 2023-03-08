const Client = require('pg').Client;
const database = require('./database.js');
const initDB = require('../init/load_test_data.js');

const clientInfo = ({
	host: 'database.colb6htozgeu.us-west-1.rds.amazonaws.com',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'testing!!'
});

async function test() {
	// initialize test data
	await initDB.loadTestData();
	

	// addUser test cases
	let email = 'john';
	let pwd = 'success';
	await database.addUser(email, pwd).then((res) => console.assert(res["userid"] !== null, "%o", { email, pwd }));
	pwd = 'fail'
	await database.addUser(email, pwd).then((res) => console.assert(res["userid"] === null, "%o", {email, pwd}));

	
	// authenticateUser test cases
	email = 'raine@mail.com'
	pwd = 'raine'
	await database.authenticateUser(email, pwd).then((res) => console.assert(res["userid"] !== null, "%o", {email, pwd}));
	email = 'aster@mail.com';
	pwd = 'jiho';
	await database.authenticateUser(email, pwd).then((res) => console.assert(res["userid"] === null)).catch((e) => console.log(e.stack), "%o", {email, pwd});

	// getUserInfo test cases
	const asterID = await database.authenticateUser('aster@mail.com', 'aster').then((res) => { return res["userid"] });
	await database.getUserInfo(asterID).then(res => console.assert(res["lists"].length === 4 && res["tree_prog"] === 25, "%o", {asterID}));
	const badID = "abc"
	await database.getUserInfo(badID).then(res => console.assert(res["status"] === 1, "%o", {badID}));

	// createChecklist test cases
	let name = "testList";
	let content = ["a", "b", "c"];
	let checked = [true, true, true];
	await database.createChecklist(asterID, name, content, checked).then(res => console.assert(res["listid"] !== null, "%o", {asterID, name, content, checked}));
	let badContent = ["a"];
	let badChecked = [true, true, true];
	await database.createChecklist(asterID, name, badContent, badChecked).then(res => console.assert(res["listid"] === null, "%o", {asterID, name, badContent, badChecked}));
	badChecked = ["this is a string, not a boolean"];
	await database.createChecklist(asterID, name, badContent, badChecked).then(res => console.assert(res["listid"] === null, "%o", {asterID, name, badContent, badChecked}));
	
	// updateChecklist test cases
	let origName = "listToUpdate";
	const listIDToUpdate = await database.createChecklist(asterID, origName, content, checked).then(res => { return res["listid"] });
	let newName = "updateList";
	let newContent = ["up", "dated"];
	let newChecked = [false, false];
	await database.updateChecklist(listIDToUpdate, newName, newContent, newChecked)
		.then(res => console.assert(res["name"] === newName &&
										res["content"][0] === newContent[0] &&
										res["checked"][1] === newChecked[1], "%o", {listIDToUpdate, newName, newContent, newChecked}));

	// shareList test cases								
	let shareName = "shareList"
	let listIDToShare = await database.createChecklist(asterID, shareName, content, checked).then(res => { return res["listid"] });
	const chrisID = await database.authenticateUser('chris@mail.com', 'chris').then((res) => { return res["userid"] });
	const chrisEmail = 'chris@mail.com'
	await database.shareList(listIDToShare, chrisEmail)
		.then(res => console.assert(res["userid"] === chrisID &&
										res["listid"] === listIDToShare, "%o", {listIDToShare, chrisEmail}));	
	
	// growTree test cases
	const raineID = await database.authenticateUser('raine@mail.com', 'raine').then((res) => { return res["userid"] });
	const raineTreeProg = await database.getUserInfo(raineID).then(res => { return res["tree_prog"] });
	let amt1 = 5
	await database.growTree(raineID, amt1).then(res => console.assert(res["tree_prog"] === (raineTreeProg + amt1), "%o", {raineID, amt1}));
	let amt2 = 10
	await database.growTree(raineID, amt2).then(res => console.assert(res["tree_prog"] === (raineTreeProg + amt1 + amt2), "%o", {raineID, amt2}));
	
	// deleteChecklist test cases
	const delName = "listToDelete";
	const delContent = ["del", "del", "del"];
	const delChecked = [false, false, false];
	const listIDToDelete = await database.createChecklist(raineID, delName, delContent, delChecked).then(res => { return res["listid"] });
	await database.deleteChecklist(listIDToDelete).then(res => console.assert(res["status"] === 0, "%o", {listIDToDelete}));
	const fakeListID = "abc123";
	await database.deleteChecklist(fakeListID).then(res => console.assert(res["status"] === 1, "%o", {fakeListID}));

	// deleteUser test cases
	const delAsterID = asterID;
	await database.deleteUser(delAsterID).then(res => console.assert(res["numDelLists"] === 7 && res["numDelUsers"] === 1, "%o", {delAsterID}));
	const fakeUserID = "fakeUserID";
	await database.deleteUser(fakeUserID).then(res => console.assert(res["numDelLists"] === 0 && res["numDelUsers"] === 0, "%o", {fakeUserID}));
}


test();
