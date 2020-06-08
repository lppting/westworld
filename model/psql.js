var pg = require('pg');
var conString = "tcp://postgres@localhost/nodedb";
var client = new pg.Client(conString);

var cTable = 'CREATE TABLE info(\
        _id serial NOT NULL,\
        infohash character varying(128),\
        time timestamp,\
        total integer,\
        UNIQUE (infohash));'
var cSearch = 'SELECT * FROM info ORDER BY total DESC LIMIT 10';
client.connect(function(error,results){
  if(error){
    console.log(error.message);
    client.end();
    return;
  }
});

var data = {
         host:'127.0.0.1',
         port:6800,
         secure:false,
         secret:'',
         path:'/jsonrpc'
    }
//"magnet:?xt=urn:btih:c453e42901fe9b9fc4259090283d27724f7a7174"
var magnet = "magnet:?xt=urn:btih:575A63BEC3F0BA1C0BC0B93E091B1D49422ECD94";
// const request = require('request');
// var dict = {'jsonrpc':'2.0', 
//             'id':'2.0',                     
//             'method':'aria2.addMetalink',
//             'params':[magnet]
//             }
// console.log(JSON.stringify(dict));
// request('http://localhost:6800/jsonrpc',data,function(error,res,body){
//       console.log(error);
// })


client.query(cSearch,function(error,results){
     if(error){
         console.log(error);
     }
     else{
         var row = results.rows;
         for(var i=0;i<row.length;i++){
            var magnet = 'magnet:?xt=urn:btih:'+row[i].infohash;
           // download(magnet);
         }
         
     }
  })

function fund(data){
  console.log(data)
  var fd = data;
  var insert = 'INSERT INTO fund_data(fundcode,name,time,dwjz,gsz)'+
               'VALUES('+
               "'"+parseInt(fd.fundcode)+"',"+"'"+fd.name+"',"+
               'localtimestamp(0),'+"'"+parseFloat(fd.dwjz)+"',"+"'"+parseFloat(fd.gsz)+"'"+')'               
  client.query(insert,function(error,results){
     if(error){
         console.log(error);
     }
  })  
};
function cmd(cmdStr){
    client.query(cmdStr,function(error,results){
           if(error){
                   console.log(error);
               }
            })  
}
function cmdSearch(cmdStr){
    client.query(cmdStr,function(error,results){
           if(error){
                   console.log(error);
               }
               return results.rows;
         //   console.log(results.rows);
            })  
}
var pgql = {
    Fdata:  function(data){
            console.log(data)
            var fd = data;
            var insert = 'INSERT INTO fund_data(fundcode,name,time,dwjz,gsz)'+
                         'VALUES('+
                         "'"+parseInt(fd.fundcode)+"',"+"'"+fd.name+"',"+
                         'localtimestamp(0),'+"'"+parseFloat(fd.dwjz)+"',"+"'"+parseFloat(fd.gsz)+"'"+')'
            cmd(insert);
          },
    Fsearch:function(callback){
            var cStr = 'SELECT * FROM fund_data ORDER BY time DESC LIMIT 10;'
            client.query(cStr,function(error,results){
               if(error){
                       console.log(error);
                   }
               return callback(results.rows);
         //   console.log(results.rows);
            });  
          }
}

module.exports = pgql
// var hash = data;
//   var insert = 'INSERT INTO info(infohash,time,total)'+
//                'VALUES('+
//                "'"+hash+"',"+
//                'localtimestamp(0),'+
//                1+')'+
//                'ON conflict(infohash) '+
//                "DO UPDATE SET time = localtimestamp(0) ,total = info.total +1"
//   client.query(insert,function(error,results){
//      if(error){
//          console.log(error);
//      }
//   })
