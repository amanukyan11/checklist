const Client = require('pg').Client;

// information to connect to the pgsql server
const client = new Client({
	host: 'url',
	port: port,
	database: 'postgres',
	user: 'user',
	password: 'pass'
})

// creates a simple table to test early front- and back- end connection
const txt = `CREATE TABLE userPass (
	user_id serial PRIMARY KEY,  
	username text UNIQUE NOT NULL, 
	password text NOT NULL, 
	treeVal int
);`;

// connect to server and create the test table
client.connect();
client.query(txt, () => client.end());