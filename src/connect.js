async function addUser(username, password) {

	const res = await fetch(`http://localhost:5000/addUser/${username}/${password}`);
	
	const ret = await res.json();

	console.log(ret);

	return ret["status"] === 0;
}

/*

test code

// evaluates to true
addUser('aster', 'pass123!').then((val) => console.log(val));

// evaluates to false
addUser('aster', 'pass123!').then((val) => console.log(val));

// evaluates to false
addUser('aster', 'aaaa!').then((val) => console.log(val));

// evaluates to true at first, then false onwards
addUser('isuehnbesksegytuer', 'aaaa!');


*/
