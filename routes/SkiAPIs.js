var db = require('./db');
var moment = require('moment');

this.createSkiRecord = function(req, res, next) {
  
  
  var ski = req.body;  
  //var select = [req.body.ski_start_time, req.body.user_id, req.body.event_id]
  var ski_id = req.body.user_id + req.body.event_id + req.body.ski_start_time +  moment().unix();
  ski["ski_id"] = ski_id;

  console.log(ski);
  db.dmlQry('insert into ski_event set ? ',ski, function(error,result){
    if(error){
        console.log("Error" + error);
        res.writeHead(500, {'Content-Type': "application/json"});
        res.end(JSON.stringify({response:error}));
    }
    else{
       
              //var replyJson = {user_id : result.email_id};
              res.writeHead(200, {'Content-Type': "application/json"});
              res.end(JSON.stringify({ski_id : ski_id}));
                       
    }          
  });
};


this.getSkiRecords = function(req, res, next) {
     db.dmlQry('select * from ski_event where user_id = ?', req.body.user_id, function(error,result) {
      if(error){
          console.log("Error" + error);
          res.writeHead(500, {'Content-Type': "application/json"});
          res.end(JSON.stringify({response:error}));
      }
       else{
           
           if(result.length != 0)
             
            res.end(JSON.stringify(result));  
          
          else{
            //send error
            res.writeHead(403, {'Content-Type': "application/json"});
                res.end(JSON.stringify({response:'Invalid User'}));
          }  
         
          }  
                
     });
   };

this.deleteSkiRecord = function(req, res, next) {


//console.log(user_id);
db.dmlQry('delete from ski_event where ski_id = ?', req.body.ski_id, function(error,result){
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


