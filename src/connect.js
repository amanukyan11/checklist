module.exports = {authenticateUser, addUser, getUserInfo, createChecklist, updateChecklist, shareList, growTree, deleteChecklist, deleteUser};

async function addUser(email, password) {
	const res = await fetch(`http://localhost:5000/addUser/${email}/${password}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}


async function authenticateUser(email, password) {
	const res = await fetch(`http://localhost:5000/authenticateUser/${email}/${password}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function getUserInfo(userID) {
	const res = await fetch(`http://localhost:5000/getUserInfo/${userID}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function createChecklist(userID, listName, newContent, newChecked) {
	const content = JSON.stringify(newContent);
	const checked = JSON.stringify(newChecked);
	const res = await fetch(`http://localhost:5000/createChecklist/${userID}/${listName}/${content}/${checked}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function updateChecklist(listID, listName, newContent, newChecked) {
	const content = JSON.stringify(newContent);
	const checked = JSON.stringify(newChecked);
	const res = await fetch(`http://localhost:5000/updateChecklist/${listID}/${listName}/${content}/${checked}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function shareList(listID, newEmail) {
	const res = await fetch(`http://localhost:5000/shareList/${listID}/${newEmail}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function growTree(userID, amount) {
	const res = await fetch(`http://localhost:5000/growTree/${userID}/${amount}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function deleteChecklist(listID) {
	const res = await fetch(`http://localhost:5000/deleteChecklist/${listID}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}

async function deleteUser(userID) {
	const res = await fetch(`http://localhost:5000/deleteUser/${userID}`);
	const response = await res.text();
	const ret = JSON.parse(response);
	return ret;
}


/*

example code

addUser('testing@blah.com', 'pass123!').then((val) => console.log(val));
authenticateUser('testing@blah.com', 'pass123!').then((val) => console.log(val));
authenticateUser('testing@blah.com', 'aaaaaa!').then((val) => console.log(val));
getUserInfo('9b692ff7-c2f0-46a6-86fd-0316ca57bf9b').then((val) => console.log(val));
getUserInfo('9b692ff7-c2f0-46a6-86fd-0316ca57bf9b').then((val) => console.log(val["lists"]));
createChecklist('9b692ff7-c2f0-46a6-86fd-0316ca57bf9b', 'sendhelp', ["cat", "dog"], [true, false]).then((val) => console.log(val));
shareList('1b5b6893-b777-4fd2-b5bd-2b367ca960fd', 'jiho@mail.com').then((val) => console.log(val));
growTree('9b692ff7-c2f0-46a6-86fd-0316ca57bf9b', 99).then((val) => console.log(val));
deleteUser('9b692ff7-c2f0-46a6-86fd-0316ca57bf9b').then((val) => console.log(val));

*/
