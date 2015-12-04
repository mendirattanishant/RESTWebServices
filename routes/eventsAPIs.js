var db = require('./db');
var moment = require('moment');
this.create_event = function(req, res, next) {
          
              var event_id_new;
  console.log("In create Event");
  var event_details = req.body;  
  var user_id = req.body.user_id;
  //var event_id = req.body.event_id;
  var event_name = req.body.event_name;
  var location = req.body.location;
  var date = req.body.date;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;  
//   var event_id = event_name +  moment().unix();
//   event_details["event_id"] = event_id;
//   console.log(event_id);


  console.log(event_details);
  db.dmlQry('insert into events set ?',event_details, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else {
        event_id_new = result.insertId;
           var event_details_attendees = 
    {
    "event_id":event_id_new,
    "user_id":user_id };
  db.dmlQry('insert into event_attendees set ?',event_details_attendees, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
        var response = event_id_new;
        
   	    //res.send(200, {'Content-Type': "application/json"});
        res.end(JSON.stringify({event_id: event_id_new}));
    }
  });
    }
  });


};

this.getEventRecords = function(req, res, next) {
    console.log("#########################In Get Events#######################")
  //var event_id = req.params.event_id;
  var resultJSON = {};
  db.dmlQry('select * from events where event_id = ? ', req.params.event_id, function(error,result) {
  if(error){
      console.log("Error" + error);
      res.writeHead(500, {'Content-Type': "application/json"});
      res.end(JSON.stringify({response:error}));
  }
   else{
       
       if(result.length != 0)
         //res.end(JSON.stringify(result));
         resultJSON = result[0];
         
      else {
        //send error
        res.writeHead(403, {'Content-Type': "application/json"});
            res.end(JSON.stringify({response:'Invalid Event ID'}));
      }  
     
      }  
            
  });
  
  
  db.dmlQry('select u.* from events e join event_attendees ea on e.event_id = ea.event_id join users u on ea.user_id = u.user_id where e.event_id = ? ', req.params.event_id, function(error,result) {
  if(error){
      console.log("Error" + error);
      res.writeHead(500, {'Content-Type': "application/json"});
      res.end(JSON.stringify({response:error}));
  }
   else{
       
       if(result.length != 0) {
         
         resultJSON.users = result;
         console.log("printing the complete json");
         console.log(resultJSON);
         res.end(JSON.stringify(resultJSON));
       }     
      else {
        //send error
        res.writeHead(403, {'Content-Type': "application/json"});
            res.end(JSON.stringify({response:'Invalid Event ID'}));
      }  
     
      }  
            
  });
};




this.deleteEventRecord = function(req, res, next) {
var event_id = req.body.event_id ; 
//var user_id = req.body.user_id ; 

//var del_new = [event_id,user_id];

//console.log(user_id);
db.dmlQry('delete from events where event_id = ?', event_id, function(error,result){
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


db.dmlQry('delete from event_attendees where event_id = ?', event_id, function(error,result){
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
