var pgsql = require('./pgsql');
var websocket = require('./websocket');
var schedule = require('node-schedule');

pgsql.NewData(function(da){
         //   console.log(da[14].infohash)
         //   for(var i=0;i<da.length;i++){
            	
            //	setTimeout(intervalFunc(da[i].infohash), 1500);
            //	SCs(da[i].infohash);
            	SCs(da);
            	
            
            
    });

const SCs = (dict)=>{
	var i = 0;
	schedule.scheduleJob('1-59 0-59 * * * 1-5',()=>{
		// websocket.connect(function() {
		// 	    websocket.send({
		// 	        method : 'aria2.addUri',
		// 	        params : [['magnet:?xt=urn:btih:'+str]]
		// 	    }, function(result) {
		// 	        console.log(result);
		// 	        });
		// 	    });
		i+= 1;
		var len = dict.length;
		if( i <= len ){
			console.log(i,dict[i].infohash);
			websocket.connect(function() {
			    websocket.send({
			        method : 'aria2.addUri',
			        params : [['magnet:?xt=urn:btih:'+dict[i].infohash]]
			    }, function(result) {
			        console.log(result);
			        });
			    });
		}
		
	});
}

function intervalFunc(str) {
  console.log(str)
}

