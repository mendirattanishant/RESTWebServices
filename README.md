
Web Services created in Node.js using MySQL as the database. 

### Installation
>You need Node and MySQL installed on your machine. You can install it from nodejs.org

>Download and Install MySQL
- For Mac users https://dev.mysql.com/doc/refman/5.7/en/osx-installation-pkg.html
- For Windows users https://dev.mysql.com/downloads/mysql/

>Download and Install MySQL Workbench with username "root" and password "mysql"

>Create schema as in DB_Schema folder

>Start your MySQL server from SQL Workbench

>From project directory run this command
```sh
$ npm install
```
>Run the server.js file with command
```sh
$ node server.js
```

>Use RESTClient like https://chrome.google.com/webstore/detail/postman-rest-client-short/mkhojklkhkdaghjjfdnphfphiaiohkef?hl=en to call APIs
The OpenShift `nodejs` cartridge documentation can be found at:

http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs
>Our Server is running on eskimo-cmpe277.rhcloud.com/

- To make a rest call to create an event call this API "/createEvent"
- This is a sample request that you can make 
- {
  "event_name": "Ski @ 1st Street",
  "user_id": "1",
  "location": "San Jose",
  "start_time": "2015-12-10 00:00:00",
  "end_time": "2015-12-11 00:00:00"
  }
- This a sample response you get 
- {
    "event_id": "Ski @ 1st Street1449023165"
  }
