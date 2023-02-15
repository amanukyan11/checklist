async function checkUser(username, password) {

	const res = await fetch(`http://localhost:5000/checkUser/${username}/${password}`);
	
	const ret = await res.text();

	return ret === 'true';
}

async function addUser(username, password) {

	const res = await fetch(`http://localhost:5000/addUser/${username}/${password}`);
	
	const ret = await res.text();

	console.log(ret);

	return ret === 'true';
}

/*

test code

// evaluates to true
checkUser('aster', 'pass123!').then((val) => console.log(val));

// evaluates to false
checkUser('aster', 'aaa!').then((val) => console.log(val));

// evaluates to false
addUser('aster', 'pass123!').then((val) => console.log(val));

// evaluates to false
addUser('aster', 'aaaa!').then((val) => console.log(val));

// evaluates to true at first, then false onwards
addUser('isuehnbesksegytuer', 'aaaa!');


*/