const Client = require('pg').Client;
module.exports = {loadTestData};
// information to connect to the pgsql server
const clientInfo = require('../backend/client_info')

async function loadTestData() {
	const txt = ` 
		DELETE FROM checklists;
		DELETE FROM perms;
		DELETE FROM user_info;
		INSERT INTO user_info (email, password, tree_prog) VALUES 
			('raine@mail.com', crypt('raine', gen_salt('bf')), 0),
			('aster@mail.com', crypt('aster', gen_salt('bf')), 25),
			('aram@mail.com', crypt('aram', gen_salt('bf')), 50),
			('john@mail.com', crypt('john', gen_salt('bf')), 100),
			('jiho@mail.com', crypt('jiho', gen_salt('bf')), 300),
			('chris@mail.com', crypt('chris', gen_salt('bf')), 5000);
				

		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ('Raine''s List','{"do thing one", "do thing two", "do thing three"}', '{0,0,0}')
		RETURNING listID)


		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id),
			(select userID from user_info where email='raine@mail.com'));
			
		INSERT INTO perms (listID, userID)
		VALUES ((SELECT r.listID
		FROM user_info l
		JOIN perms r
		ON l.userID = r.userID
		WHERE l.email= 'raine@mail.com'
		LIMIT 1), (select userID from user_info where email='aster@mail.com'));


		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ('Aram''s List','{"do thing one", "do thing two", "do thing three"}', '{1,1,1}')
		RETURNING listID)


		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id),
			(select userID from user_info where email='aram@mail.com'));
			
			
		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ('John''s List','{"do thing one", "do thing two", "do thing three"}', '{0,1,1}')
		RETURNING listID)


		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id),
			(select userID from user_info where email='john@mail.com'));
			
			
		INSERT INTO perms (listID, userID)
		VALUES ((SELECT r.listID
		FROM user_info l
		JOIN perms r
		ON l.userID = r.userID
		WHERE l.email= 'john@mail.com'
		LIMIT 1), (select userID from user_info where email='jiho@mail.com'));

		INSERT INTO perms (listID, userID)
		VALUES ((SELECT r.listID
		FROM user_info l
		JOIN perms r
		ON l.userID = r.userID
		WHERE l.email= 'john@mail.com'
		LIMIT 1), (select userID from user_info where email='chris@mail.com'));


		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ('Aster''s First List','{"THING", "MIDDLE THING", "LAST THING"}', '{0,0,1}')
		RETURNING listID)


		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id),
			(select userID from user_info where email='aster@mail.com'));
			
		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ('Aster''s Second List','{"THING", "MIDDLE THING", "LAST THING"}', '{1,0,1}')
		RETURNING listID)


		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id),
			(select userID from user_info where email='aster@mail.com'));

		with id as (INSERT INTO checklists (name, content, checked) 
		VALUES ('Aster''s Third List','{"THING", "MIDDLE THING", "LAST THING"}', '{1,0,0}')
		RETURNING listID)


		INSERT INTO perms (listID, userID) 
		VALUES ((select * from id),
			(select userID from user_info where email='aster@mail.com'));

		`;

	// connect to server and create the test table
	const client = new Client(clientInfo);
	await client.connect();
	try {
		await client.query(txt);
		console.log("data successfully loaded")
	} catch (e) {
		console.log(e.stack);
	} finally {
		await client.end();
	}
}
if (require.main === module){
	loadTestData();
}