const Client = require('pg').Client;
module.exports = {initSQL};

// information to connect to the pgsql server
async function initSQL() {
	const client = new Client({
		host: 'database.colb6htozgeu.us-west-1.rds.amazonaws.com',
		port: 5432,
		database: 'postgres',
		user: 'postgres',
		password: 'testing!!'
	})
	
	// creates a simple table to test early front- and back- end connection
	const txt = `CREATE extension IF NOT EXISTS "uuid-ossp";
	CREATE extension IF NOT EXISTS pgcrypto;
	
	
	CREATE TABLE IF NOT EXISTS user_info (
		userID uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
		email text NOT NULL UNIQUE,
		password text NOT NULL,
		tree_prog int DEFAULT 0
	);
	
	CREATE TABLE IF NOT EXISTS checklists (
		listID uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
		name text,
		content text[],
		checked boolean[]
	);
	
	CREATE TABLE IF NOT EXISTS perms (
		listID uuid,
		userID uuid,
		PRIMARY KEY (listID, userID),
		FOREIGN KEY (listID) REFERENCES checklists(listID) ON DELETE CASCADE,
		FOREIGN KEY (userID) REFERENCES user_info(userID) ON DELETE CASCADE
	);`;
	
	// connect to server and create the test table
	await client.connect();
	try {
		await client.query(txt, () => client.end());
		console.log('schema initialized')
	} catch (e) {
		console.log(e.message);
	} finally {
		await client.end();
	}
}

if (require.main === module) {
	initSQL();
}
