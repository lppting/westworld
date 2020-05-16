var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var bodyParser = require('body-parser');
var path = require('path');
var join = require('path').join;
var ejs = require('ejs');
var app = express();
var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');
var tools = require('./model/tools');
var websocket = require('./model/websocket');



app.set('views',path.join(__dirname,"./"));
app.engine('html',require('ejs').__express);
app.set('view engine','html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static('public'));
//app.use(multer({ dest: 'D:/Node/app/' }).array('img'));
//var upload = multer({ dest:'D:/Video',filename:'dasda.jpg'});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'E:/UPdata')
  },
  filename: function (req, file, cb) {
  	//console.log(file);
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });
//const upload = multer({ dest: 'C:/Users/Administrator/Desktop/image' })	

app.get('/list', function (req, res, next) {
	// superagent.get('http://m.iptv186.com/?act=play&token=68175c554cb942217f3dde06d69a3669&tid=ty&id=1')
 //    .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
 //    .end(function (err, sres) {
 //      if (err) {
 //        return next(err);
 //      }
 //      var $ = cheerio.load(sres.text);
 //      var items = [];
 //      $('#playURL option').each(function (idx, element) {  
 //        var $element = $(element);
 //        items.push({
 //        	tvinfo:$element.attr('value'),
 //        	title:$element.text(),
 //        });
 //      });
 //      console.log(items);
 //      var header = "DAUMPLAYLIST\r\nplayname="+items[0].tvinfo+"\r\ntopindex=20\r\nsaveplaypos=0\r\n";
 //      var end = '';
 //      for (var i=0; i<items.length;i++) 
 //      {
 //      	 var file = i+'*file*'+items[i].tvinfo+"\r\n";
 //      	 var title = i+'*title*'+items[i].title+"\r\n";
 //      	 var play = i+'*played*0'+"\r\n";
 //      	 end += file+title+play;
 //      }
 //      var header = header + end;
 //      fs.writeFile('./message.dpl', header,function(err){
	// 	    if(err) console.log('写文件操作失败');
	// 	    else console.log('写文件操作成功');
	// 	});
    res.render('img');
   // });
});
app.get('/yirenzhixia', function (req, res, next) {
  var items = [];
  superagent.get('https://www.tohomh123.com/yirenzhixia')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      $('#detail-list-select-1 a').each(function (idx, element) {  
        var $element = $(element);
        items.push({
          href: $element.attr('href'),
          title:$element.text()
        });
      });
    console.log(items); 
    res.render('show',{json:items});
    });
});
app.post('/save',function(req,res,next){
    var data = req.body;
    res.send("ok");
});
app.get('/post', function (req, res,next) {
    res.render('save');
});
app.get('/info', function (req, res,next) {
    res.render('info',{json:data});
});
app.get('/read/', function (req, res,next) {
	var comic = [];
    superagent.get('https://www.tohomh123.com/yirenzhixia')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      $('#detail-list-select-1 a').each(function (idx, element) {  
        var $element = $(element);
        comic.push({
          href: $element.attr('href'),
          title:$element.text()
        });
      });
    });

    var url = "https://www.tohomh123.com/yirenzhixia/";
    url = url+req.query.id+'.html';
    superagent.get(url)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      } 
      var info = [];
      var title = '';
      var $ = cheerio.load(sres.text);
      $("h1").each(function(idx,element){
        title = $(this).text();
      });
      $('html').find('script').each(function(idx,element){
        var text = $(this).html();
        if(idx == 6){ 
          eval(text);
          var pic = pcount;
          var p1 = pl;
          info.push({
            'count':pic,
            'pic':p1,
            'sid':sid,
            'title':title
          });
          } 
      }) 
//      res.send(info);
//      res.send(info);
    console.log(comic);
    res.render('read',{json:info,data:comic});
    });
    

});
app.get('/comic/', function (req, res,next) {
  var comic = [];
    superagent.get('https://www.tohomh123.com/yirenzhixia')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      $('#detail-list-select-1 a').each(function (idx, element) {  
        var $element = $(element);
        comic.push({
          href: $element.attr('href'),
          title:$element.text()
        });
      });
    });

    var url = "https://www.tohomh123.com/yirenzhixia/";
    url = url+req.query.id+'.html';
    superagent.get(url)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var info = [];
      var title = '';
      var $ = cheerio.load(sres.text);
      $("h1").each(function(idx,element){
        title = $(this).text();
      });
      $('html').find('script').each(function(idx,element){
        var text = $(this).html();
        if(idx == 6){ 
          eval(text);
          var pic = pcount;
          var p1 = pl;
          info.push({
            'count':pic,
            'pic':p1,
            'sid':sid,
            'title':title
          });
          } 
      }) 
//      res.send(info);
      console.log(info);
      res.send(info);
   // res.render('comic',{json:info,data:comic});
    });
    

});
app.get('/ok', function (req, res,next) {
	superagent
	  .get('https://mh3.xitangwenhua.com/upload/yirenzhixia/8685848/0000.jpg')
	  .set({
	  	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
		'Referer': 'https://www.tohomh123.com/yirenzhixia/432.html'
		})
	  .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres);
      var img = new Buffer(sres.body);
      fs.writeFile('./12.jpg',img,function(err){
      	if(err){console.log(err)};
      })
//      console.log(sres.body);
  //    res.send(img);
      
    });
	
});
app.get('/', function (req, res,next) {
    function displayFile(param){
		var url = [];
		var pathName = path.resolve(param);
		function findJsonFile(path){
	        let files = fs.readdirSync(path);
	        files.forEach((e) =>{
	            let fPath = join(path,e);
	            let stat = fs.statSync(fPath);
	            let title = '';
	            let len = e.split('.').length
	            let titleOf = e.split('.').length[e.split('.').length-1]
	            
	            // if(stat.isFile() && stat.size < 5000000){
	            // 	fs.unlinkSync(fPath);
	            // }
	            if( len <= 1 &&  (titleOf == 'mp4' && titleOf == 'mkv')){
	            	title = e.split('.')[0];
	            	
	            }
	            if(stat.isDirectory() === true) {
	            	title = e.split('.')[0];
	            	
	                findDirFile(fPath);
	            }
	           
	            if (stat.isFile() === true) { 
	            	var name = fPath.split('.');
	            	if(stat.size >= 10000000){
	            	//	console.log(fPath);
      //       			var buffer = new Buffer(fPath);
						// var ThePath = buffer.toString('base64');
						fPath = fPath.replace('E:\\Movies\\','');
	            		if( fPath.indexOf('\\') > 0){
					        fPath = fPath.replace('\\','|')
					    };
            			var buffer = new Buffer(fPath);
						var ThePath = buffer.toString('base64');
						if( ThePath.indexOf('/') > 0){
					        ThePath = ThePath.replace('/','{')
					    };
			              url.push({
			              	'path':ThePath,
			              	'name':tools.shortname(e),
			              	'title':title
			              });	
	            	}
	            	
	            }
	        });
    }
    function findDirFile(path){
    	let dir = [];
    	let names = {'name':''};
    	let name ='';
    	let title = ''
        let files = fs.readdirSync(path);
	    files.forEach((e) =>{
            let fPath = join(path,e);
            let stat = fs.statSync(fPath);
            let title = '';
            let len = e.split('.').length
            let titleOf = e.split('.').length[e.split('.').length-1]
            
            // if(stat.isFile() && stat.size < 5000000){
            // 	fs.unlinkSync(fPath);
            // }
            if( len <= 1 &&  (titleOf == 'mp4' && titleOf == 'mkv')){
            	title = e.split('.')[0];
            	
            }
            if (stat.isFile() === true) { 
	            	var name = fPath.split('.');
	            	if(stat.size >= 10000000){
	            	//	console.log(fPath);
	            		fPath = fPath.replace('E:\\Movies\\','');
	            		if( fPath.indexOf('\\') > 0){
					        fPath = fPath.replace('\\','|')
					    };
            			var buffer = new Buffer(fPath);
						var ThePath = buffer.toString('base64');
						if( ThePath.indexOf('/') > 0){
					        ThePath = ThePath.replace('/','{')
					    };
      //       			var buffer = new Buffer(fPath);
						// var ThePath = buffer.toString('base64');
						name = tools.shortname(e);
						names.name = name
						dir.push({
                            'Depath':ThePath,
                            'name':tools.shortname(e),
			              	'title':title
						});
			              // url.push({
			              // 	'path':ThePath,
			              // 	'name':e,
			              // 	'title':title
			              // });	
	            	}
	            	
	            }
	    });
	    url.push({
	      	'path':dir,
	      	'name':names.name,
	      	'title':title
	      });	
    }
    findJsonFile(pathName);
    fs.writeFile('./video.json', JSON.stringify(url), { 'flag': 'w+' }, function(err) {
	    if (err) {
	        throw err;
	    }
	});
	res.render('index',{json:url});
	}
	displayFile("E:/Movies");

});

app.get('/rt', function (req, res,next) {
    function displayFile(param){
		var url = [];
		let isDir = false;
		var pathName = path.resolve(param);
		function findJsonFile(path){
	        let files = fs.readdirSync(path);
	        files.forEach((e) =>{
	            let fPath = join(path,e);

	            let stat = fs.statSync(fPath);
	            let title = '';
	            let dir= [];
	           
	            let len = e.split('.').length
	            let titleOf = e.split('.').length[e.split('.').length-1]
	            
	            // if(stat.isFile() && stat.size < 5000000){
	            // 	fs.unlinkSync(fPath);
	            // }
	            if( len <= 1 &&  (titleOf == 'mp4' && titleOf == 'mkv')){
	            	title = e.split('.')[0];
	            }
	            if(stat.isDirectory() === true) {
	            	title = e.split('.')[0];
	            	isDir = true;
	                findJsonFile(fPath);
	            }
	            if (stat.isFile() === true) { 
	            	var name = fPath.split('.');
	            	if(stat.size >= 100000000){
	            		fPath = fPath.replace('E:\\Movies\\','');
	            		if( fPath.indexOf('\\') > 0){
					        fPath = fPath.replace('\\','|')
					    };
            			var buffer = new Buffer(fPath);
						var ThePath = buffer.toString('base64');
						if( ThePath.indexOf('/') > 0){
					        ThePath = ThePath.replace('/','{')
					    };
					    if( isDir == false ){
					    	url.push({
			              	'path':ThePath,
			              	'name':tools.shortname(e),
			              	'title':title
			              });	
					    }
					    else{
					    	dir.push({
					    		dePath:ThePath
					    	})
					    	url.push({
			              	'path':dir,
			              	'name':tools.shortname(e),
			              	'title':title
			              });	
					    	isDir = false;
					    }
			              
	            	}
				}
	            	
	            
	        });
    }
    findJsonFile(pathName);
    fs.writeFile('./video.json', JSON.stringify(url), { 'flag': 'w+' }, function(err) {
	    if (err) {
	        throw err;
	    }
	});
	res.render('index',{json:url});
	}
	displayFile("E:/Movies");

});

app.get('/video', function (req, res,next) {
	function displayFile(param){
		var url = [];
		var pathName = path.resolve(param);
		function findJsonFile(path){
	        let files = fs.readdirSync(path);
	        files.forEach((e) =>{

	            let fPath = join(path,e);
	            let stat = fs.statSync(fPath);
	            if(stat.isDirectory() === true) {
	                findJsonFile(fPath);
	            }
	            if (stat.isFile() === true) { 
	              url.push(fPath);
	            }
	        });
    }
    findJsonFile(pathName);
    fs.writeFile('./video.json', JSON.stringify(url), { 'flag': 'w+' }, function(err) {
	    if (err) {
	        throw err;
	    }
	});
// 		var pathName = path.resolve(param);
// 		fs.readdir(pathName, function(err, files){
// 	    var dirs = [];
// 	    (function iterator(i){
// 	      if(i == files.length) {
// 	        console.log(dirs);
// 	        return ;
// 	      }
// 	      files.forEach((e) => {
// 	                    //遍历之后递归调用查看文件函数
// 	                    //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
// 	                    var absolutePath = path.resolve(path.join(param, e));
// 	                //    displayFile(absolutePath)
// 	                    console.log(absolutePath);
// 	                })
// 	      var pathUrl = path.join(pathName,files[i]);
// 	      fs.stat(pathUrl, function(err, data){     
// 	        if(data.isFile()){               
// 	            dirs.push(files[i]);
// 	        }
	        
// 	        iterator(i+1);
// 	       });   
// 	    })(0);
// });


	   //  fs.stat(param, function (err, stats) {
	   //      //如果是目录的话，遍历目录下的文件信息
	   //      // console.log(stats);
	   //      if (stats.isDirectory()) {
	   //          fs.readdir(param, function (err, file) {
	   //              file.forEach((e) => {
	   //                  //遍历之后递归调用查看文件函数
	   //                  //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
	   //                  var absolutePath = path.resolve(path.join(param, e));
	   //                  displayFile(absolutePath)
	   //               //   console.log(e);
	   //              })
	                
	   //          })
	   //      } else {
	   //      //如果不是目录，打印文件信息
	   //          url.push({
	   //          	'path':param
	   //          })
	   //          console.log(param);
	   //      }
	   //   //   console.log(url.length);
	   //      if(url.length !== 0){
	   //      	fs.writeFile('./video.json', JSON.stringify(url), { 'flag': 'w+' }, function(err) {
				//     if (err) {
				//         throw err;
				//     }
				// });
	   //      }
	   //  })
	}
	displayFile("D:/SYNC/电影");
	// fs.readFile('./video.json', 'utf-8', function(err, data) {
	//         if (err) {
	//             throw err;
	//         }
	//         var data = JSON.parse(data);
	//         var path = data[0].path;
	// 		var stat = fs.statSync(path);
	// 		var fileSize = stat.size;
	// 		var range = req.headers.range;
	// 		var parts = range.replace(/bytes=/, "").split("-")
	// 		var start = parseInt(parts[0], 10);
	// 		var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

	// 		var chunksize = (end-start) + 1;
	// 		var file = fs.createReadStream(path, {start, end})
	// 		var head = {
	// 			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	// 			'Accept-Ranges': 'bytes',
	// 			'Content-Length': chunksize,
	// 			'Content-Type': 'video/mp4',
	// 		}
			
	// 		res.writeHead(206, head);
	// 		file.pipe(res);
	// //		res.render('video');
	//     });
		
	});
app.get('/movie',function(req,res,next){
	res.render('video');
});
app.get('/media',function(req,res,next){
    var data = req.body;
    var b = new Buffer(req.query.path, 'base64')
	var s = b.toString();
	   //  console.log(s);
    // console.log(s);
    var path = b.toString();
    var stat = fs.statSync(path);
    var fileSize = stat.size;
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-")
    var start = parseInt(parts[0], 10);
    var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    var chunksize = (end-start) + 1;
    var file = fs.createReadStream(path, {start, end})
    var head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
    }
    
    res.writeHead(206, head);
    file.pipe(res);
});
app.post('/img34',function(req,res,next){
    var data = req.body;
    superagent
	  .get(data.url)
	  .set({
	  	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
		'Referer': 'https://www.tohomh123.com/yirenzhixia/432.html'
		})
	  .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres);
      var img = new Buffer(sres.body);
      fs.writeFile('./12.jpg',img,function(err){
      	if(err){console.log(err)};
      })
//      console.log(sres.body);
      res.send(img);
      
    });
});
app.get('/img', function(req, res, next) {
	function displayFile(param){
	var url = [];
		var pathName = path.resolve(param);
		function findJsonFile(path){
	        let files = fs.readdirSync(path);
	        files.forEach((e) =>{

	            let fPath = join(path,e);
	            let stat = fs.statSync(fPath);
	            if(stat.isDirectory() === true) {
	                findJsonFile(fPath);
	            }
	            if (stat.isFile() === true) { 
	            //  url.push(fPath);
	              url.push({			              	
			              	'name':e
			              });		
	            }
	        });
    }
    findJsonFile(pathName);
   // console.log(url)
    res.render('img',{json:url});
    };
    displayFile("E:/img/");
});

app.get('/movies', function(req, res, next) {
	function displayFile(param){
	var url = [];
		var pathName = path.resolve(param);
		function findJsonFile(path){
	        let files = fs.readdirSync(path);
	        files.forEach((e) =>{

	            let fPath = join(path,e);
	            let stat = fs.statSync(fPath);
	            if(stat.isDirectory() === true) {
	                findJsonFile(fPath);
	            }
	            if (stat.isFile() === true) { 
	            //  url.push(fPath);
	              url.push({
			              	
			              	'name':e
			              });		
	            }
	        });
    }
    findJsonFile(pathName);
   // console.log(url)
    res.render('movieList',{json:url});
    };
    displayFile("E:/Movies");
});
app.get('/image/:name', function(req, res, next) {
	//建议使用绝对路径查找图片
	var title = req.params.name;
	if( title.indexOf('|') > 0){
        title = title.replace('|','\\')
    };
    if( title.indexOf('{') > 0){
        title = title.replace('{','/')
    };
	var datatype = title.substring(title.lastIndexOf('.')+1)
	//console.log(url+"---------");
   // var datatype = req.params.name.split('.')[1];
    let dataUrl = '';
    if( datatype == 'mp4'){
    	dataUrl = 'E:/Movies/'+title;
    	var stat = fs.statSync(dataUrl);
	    var fileSize = stat.size;
	    var range = req.headers.range;
	    var parts = range.replace(/bytes=/, "").split("-")
	    var start = parseInt(parts[0], 10);
	    var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

	    var chunksize = (end-start) + 1;
	    var file = fs.createReadStream(dataUrl, {start, end})
	    var head = {
	        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	        'Accept-Ranges': 'bytes',
	        'Content-Length': chunksize,
	        'Content-Type': 'video/mp4',
	    }
	    
	    res.writeHead(206, head);
	}
    if( datatype == 'png'){
    	dataUrl = 'E:/img/'+title;
    	var isexist = fs.existsSync(dataUrl);
    	if( isexist == true ){
    		// title = title.replace('.png','')
    		// let md5To = crypto.createHash('md5').update(title).digest("hex");
    		// dataUrl = 'D:/Node/app/img/'+md5To+'png';
    		var file = fs.createReadStream(dataUrl)
    	}
    	else{
    		var notExist = 'E:/img/1.png';
    		title = title.replace('.png','')
    		let md5To = crypto.createHash('md5').update(title).digest("hex");
    		dataUrl = 'E:/img/'+md5To+'.png';
    		var Pngexist = fs.existsSync(dataUrl);
    //		console.log(md5To,Pngexist);
    		if(Pngexist == true){
                var file = fs.createReadStream(dataUrl);
    		}
    		else{
    			var enbase64 = Buffer(title,'base64').toString()
    //			console.log(title);
	    		var fileexist = fs.existsSync('E:/Movies/'+enbase64);
	    		tools.captureImg(title);
	    		// if(fileexist == true){
	    		// 	CaptureImg(enbase64);
	    		// }
	    		var file = fs.createReadStream(notExist)
    		}
    		
    	}
    }
 //   const rs = fs.createReadStream(dataUrl)
//	rs.pipe(res);
//	var s = b.toString();
	   //  console.log(s);
    // console.log(s);
   // var path = b.toString();
    
    file.pipe(res);
});
app.get('/aria21', function(req, res, next) {
    websocket.connect(function() {
    websocket.send({
        method : 'aria2.addUri',
        params : [['']]
    }, function(result) {
        console.log(result);
    });
});
    res.send("pk");
});
app.post('/upload', upload.single('logo'), function(req, res){//发送 json 数据到这个路由
  console.dir(req.file);
  res.send('ok');
});
app.get('/form',function(req, res){
  var form = fs.readFileSync('./form.html',{ encoding : "utf8"});
  res.send(form);
});
app.listen(3000, function () {
  console.log('app is listening at port 3000');
});