# Green Agenda: A Nature-Inspired To-Do List

**Green Agenda** is the latest tool to help people be more successful, featuring a Success Sapling to help users do more work! Every time certain objectives are completed, the Success Sapling receives care and grows. Complete checklists and use a Pomodoro Timer to be more productive, and share checklists to other users to collaborate on tasks. Use the app to make the Success Sapling flourish. **Green Agenda** is here to help users be more productive and thrive!

## Starting the Application

### Cloning the Repository:

In the terminal, run:

##### `git clone https://github.com/amanukyan11/checklist.git`

##### `cd checklist`

### To Run the Frontend:

In the terminal, run:

##### `npm install`

##### `npm start`

The app is now accessible at
http://localhost:3000.
Navigate to this URL in the browser to interact with the app.

### To Set Up the Backend:

Follow the instructions in `AWS postgreSQL Instructions.txt` to set up a PostgreSQL database.
Make sure to fill out the information in `./backend/client_info.js`.

### To Run the Backend after Setup:

In the terminal, run:

##### `node ./backend/backend.js`

The backend server is now being run on http://localhost:5000.
Navigating to this URL in the browser will display a message to confirm that it is running properly.

In order to start the app, both the frontend and backend must be set up and running.

## Key Features
* Sign up with email and password.
* Create, edit, and save multiple checklists.
* Mark checklists as complete and view a progress bar for each individual checklist.
* Share checklists with other users by inputting their email.
* Use a Pomodoro Timer to be more productive.
* Grow a Success Sapling based on productivity.


## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also uses [Amazon Web Services](https://aws.amazon.com/) to host the backend database.