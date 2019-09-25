# alumni_network_api
Backend For School Alumni Networking App
1. Install nodeJS on your system
3. Go to project home directory and install dependencies listed in package.json by executing
  - npm install
4. Install and run couchdb
5. Create databases "members" and "events"
6. Run the following command from project home directory
   i. node_modules/.bin/couchapp push databases/members.js http://127.0.0.1:5984/members (Linux/Mac)
   ii. node_modules/.bin/couchapp push databases/events.js http://127.0.0.1:5984/events (Linux/Mac)
   - use backslashes in path to couchapp in the commands (above) like node_modules\.bin\couchapp on Windows environment.
7. Start Apllication
   - npm run start
   - (Server will start listening on port 3001 )