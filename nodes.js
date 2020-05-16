var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var bodyParser = require('body-parser');
var path = require('path');
var join = require('path').join;
var ejs = require('ejs');
var app = express();

var fs = require('fs');

app.set('views',path.join(__dirname,"./"));
app.engine('html',require('ejs').__express);
app.set('view engine','html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static('public'));
app.use(multer({ dest: 'D:/Node/app/' }).array('img'));
//const upload = multer({ dest: 'C:/Users/Administrator/Desktop/image' })	

app.get('/', function(req, res, next) {
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
    console.log(url)
    res.render('img',{json:url});
    };
    displayFile("D:/Node/app/img/");
});
app.get('/image/:name', function(req, res, next) {
	//建议使用绝对路径查找图片

	const rs = fs.createReadStream('D:/Node/app/img/' + req.params.name);
	rs.pipe(res);
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});