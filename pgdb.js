var pg = require('pg');
var conString = "tcp://u0_a215@localhost/nodedb";
var client = new pg.Client(conString);

var SelectStr = "SELECT * FROM save_info";
client.connect(function(error,results){
    if(error){
  console.log(error.message);
        client.end();
  return;
    }
})
module.exports = function(){
    this.insert = function(data){
    var InsertStr = 'INSERT INTO save_info(time,info)'+
        'VALUES('+
        'localtimestamp(0),'+
        '\''+data.info+'\''+')'; 
   client.query(InsertStr,function(error,results){
       if(error){
           console.log(error.message);
       }
   });
    }
    this.select = function(callback){
  client.query(SelectStr,function(error,results){
      if(error){
          console.log(error.message);
      }
//      this.data = results.rows;
            callback(results.rows);
  });
//        callback(data);
    } 
};

