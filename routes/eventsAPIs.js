var db = require('./db');
var moment = require('moment');
this.create_event = function(req, res, next) {
          
          
  console.log("In create Event");
  var event_details = req.body;  
  var user_id = req.body.user_id;
  var event_details = req.body;  
  var user_id = req.body.user_id;
  //var event_id = req.body.event_id;
  var event_name = req.body.event_name;
  var location = req.body.location;
  var date = req.body.location;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;  
  var event_id = event_name +  moment().unix();
  event_details["event_id"] = event_id;
  console.log(event_id);


  console.log(event_details);
  db.dmlQry('insert into events set ? ',event_details, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
        var response = event_id;
        
   	    res.writeHead(200, {'Content-Type': "application/json"});
        res.end(JSON.stringify({event_id: event_id}));
    }          
  });
};