var schedule = require('node-schedule');
var cheerio = require('cheerio');
var superagent = require('superagent');
var psql = require('./psql');

const SCs = ()=>{
	schedule.scheduleJob('1 0-59 9-15 * * 1-5',()=>{

			function show(dict,callback){ 
		// 用 superagent 去抓取 https:
		// //cnodejs.org/ 的内容 
		  	var li = [{'num':10333,'url':'http://fundgz.1234567.com.cn/js/320007.js'}, 
		          {'num':1126,'url':'http://fundgz.1234567.com.cn/js/519674.js'}, 
		          {'num':1271,'url':'http://fundgz.1234567.com.cn/js/161903.js'}]
		    dict = li;
		    for(var i=0;i<li.length;i++){  
				superagent.get(dict[i].url) 
				.end(function (err, sres) 
				{ 
				if(err){ 
				console.log(err); 
				} 
				 var buffer = new Buffer.from(sres.body) 
				var str = buffer.toString(); 
				var parseStr = /\{(.+)\}/g 
				var data = JSON.parse(str.match(parseStr)) 
				
				//data['money'] = li[i].num 
				return callback(data); 
				}); 
			}
		}
		let lii = [];
		show(lii,function(n){
            psql.Fdata(n); 
		}); 
		console.log('scheduleCronStyle:'+ new Date());
	});
}

SCs();