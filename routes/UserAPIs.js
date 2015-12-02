var db = require('./db');

this.createUser = function(req, res, next) {
  
  
  console.log("In createUser");
  var user = req.body;  
  var email_id = req.body.email_id;
  var password = req.body.password;

  console.log(user);
  db.dmlQry('insert into users set ? ',user, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
        
          db.dmlQry('select user_id from users where email_id = ?', email_id, function(error,result){
            if(error) {
              console.log("Error" + error);
              res.writeHead(500, {'Content-Type': "application/json"});
              res.end(JSON.stringify({response:error}));
            }
            else{
              //var replyJson = {user_id : result.email_id};
              res.writeHead(200, {'Content-Type': "application/json"});
              res.end(JSON.stringify(result[0]));
            }

          });
    }          
  });
};

this.getUsers = function(req, res, next) {
     db.dmlQry('select email_id from users', function(error,result){
      if(error){
          console.log("Error" + error);
          res.writeHead(500, {'Content-Type': "application/json"});
          res.end(JSON.stringify({response:error}));
      }
       else{
           if(result.length != 0){
              var resArray = [];
              for(var i=0; i<result.length;i++){
                resArray.push(result[i].email_id);
              }
            res.end(JSON.stringify(resArray));  
          }
          else{
            //send error
            res.writeHead(403, {'Content-Type': "application/json"});
                res.end(JSON.stringify({response:'Invalid User'}));
          }  
       }          
     });
   };

this.login = function(req, res, next) {
var email_id = req.body.email_id;
     db.dmlQry('select user_id from users where email_id = ?',email_id, function(error,result){
      if(error){
          console.log("Error" + error);
          res.writeHead(500, {'Content-Type': "application/json"});
          res.end(JSON.stringify({response:error}));
      }
       else{
           if(result.length != 0){
            //var resArray = [];
            res.end(JSON.stringify(result[0]));  
          }
          else{
            //send error
            res.writeHead(403, {'Content-Type': "application/json"});
                res.end(JSON.stringify({user_id:-20}));
          }  
       }          
     });
   };   

this.attendEvent = function(req, res, next) {
var event_attendees = {  event_id : req.body.event_id, 
 user_id : req.body.user_id }; 

//console.log(user_id);
db.dmlQry('insert into event_attendees SET ? ',event_attendees, function(error,result){
  if(error){
      console.log("Error" + error);
      res.writeHead(500, {'Content-Type': "application/json"});
      res.end(JSON.stringify({response:error}));
  }
  else{
      var replyJson = {user_id : req.body.user_id,
              event_id : req.body.event_id};
      
      res.writeHead(200, {'Content-Type': "application/json"});
      res.end(JSON.stringify(replyJson));
  }          
});
};


this.deleteEvent = function(req, res, next) {
var event_id = req.body.event_id ; 
var user_id = req.body.user_id ; 

var del_new = [event_id,user_id];

//console.log(user_id);
db.dmlQry('delete from event_attendees where event_id = ? and user_id = ?', del_new, function(error,result){
  if(error){
      console.log("Error" + error);
      res.writeHead(500, {'Content-Type': "application/json"});
      res.end(JSON.stringify({response:error}));
  }
  else {
    
      
      res.writeHead(200, {'Content-Type': "application/json"});
      res.end(JSON.stringify({delete: "success"}));
    }
                   
});
};  

this.getAttendingEvents = function(req, res, next) {

//console.log(user_id);
db.dmlQry('select * from events, event_attendees where event_attendees.user_id = ? and event_attendees.event_id = events.event_id', req.body.user_id, function(error,result){
  if(error){
      console.log("Error" + error);
      res.writeHead(500, {'Content-Type': "application/json"});
      res.end(JSON.stringify({response:error}));
  }
  else {
      if (result.length!=0) {
        res.writeHead(200, {'Content-Type': "application/json"});
        //res.end(JSON.stringify({result}));
      }
      else {
        res.writeHead(403, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:'Invalid request'}));
      }
 }
                   
});
};   




         







