const Client = require('pg').Client;

// information to connect to the pgsql server
const client = new Client({
	host: 'database.colb6htozgeu.us-west-1.rds.amazonaws.com',
	port: 5432,
	database: 'postgres',
	user: 'postgres',
	password: 'testing!!'
})

// creates a simple table to test early front- and back- end connection
const load_data = ` 
INSERT INTO user_info (email, password) VALUES 
    ('raine@mail.com', crypt('raine', gen_salt('bf'))),
    ('aster@mail.com', crypt('aster', gen_salt('bf'))),
    ('aram@mail.com', crypt('aram', gen_salt('bf'))),
    ('john@mail.com', crypt('john', gen_salt('bf'))),
    ('jiho@mail.com', crypt('jiho', gen_salt('bf'))),
    ('chris@mail.com', crypt('chris', gen_salt('bf')));
		

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
client.connect();
client.query(load_data, (err, res) => {
    if (err) throw err
    console.log(res)
    client.end()});