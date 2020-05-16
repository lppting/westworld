var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
//var Pgdb = require('./pgdb');
//var pgdb = new Pgdb();
var app = express();

app.set('views',path.join(__dirname,"./"));
app.engine('html',require('ejs').__express);
app.set('view engine','html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ="0";

app.get('/', function (req, res, next) {
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
    res.render('show',{json:items});
    });
});
app.post('/save',function(req,res,next){
    var data = req.body;
//    var date = new Date();
//    var userId = date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
 
    var arr = {"info":data.info};
    pgdb.insert(arr);
    res.send("ok");
});
app.get('/post', function (req, res,next) {
    res.render('save');
});
app.get('/info', function (req, res,next) {
    pgdb.select(function(data){
        res.render('info',{json:data});
    });
});
app.get('/read/', function (req, res,next) {
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
        if(idx == 4){ 
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
    res.render('read',{json:info});
    });
    

});

app.get('/comic/', function (req, res,next) {
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
        if(idx == 4){ 
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
    console.log(info);
    res.render('comic',{json:info});
    });
    

});
app.get('/cctv/', function (req, res,next) {
    var url = "https://liveinfo.ysp.cctv.cn/?devid=204e0de242271257&p2pVer=P2P.3.0.31.578&randnum=0.6658168673764725&audio_format=2&hevclv=33&platform=4330303&sdtfrom=v5028&cKey=--01-SgIeAZkSchUmmLhp3SAMBbukTxfU68NUPiKaFJS3nJgK5_QpPDs6LjhRr-shStpofbzx3Azaj8JvafD4b6wbbsK1xrhWI9qYmmJ6Lhy1nD_whRDBEUAyQktLmW35YD_UQ34ojmu56yiHepYCFF7Vrd1SB06VwMsjwYLdzTwDPBMpIEqPoOffc4Zbq89oM0Gq9cjvie6tBTCyJxt447UZ-j9ATySY7oLCMZq37vYnmtgJzB28CXW71SKggw9-4fhrHF5N-o_tILkWQjx5BSxmMvRlmudiPWgP82AugeF690_llctTy9nRjbqx3HBJlg4c-Yt1EaQ9tt442KwcSSDEfMf121XANgBr-UMoslXAjZZfM1fiPHXStotSksb5ev6hJms7Pw3J_3rO7WCHAg5kxPtn_z9Mzzy7dvophrqq0nMK3eDFnFhdQkMOBaK9ihesY55cCCUHv7n_m7RNcGCSNe0Wi0&stream=2&cnlid=2000204803&refer_pageId=page_launch&wxopenid=&qq=&defnsrc=3&livepid=600001814&appVer=V7.5.1034.4136&defn=fhd&encryptVer=4.2&pageId=page_launch&newnettype=1&logintype=0&fntick=1579347396&guid=1bdb26fe353b11ea90a46c92bfd79530&vip_status=0&cmd=2&otype=json"
    url = url+req.query.id+'.html';
    superagent.get(url)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var info = [];
      var title = '';
      console.log(sres);
      var $ = cheerio.load(sres.text);
      $("h1").each(function(idx,element){
        title = $(this).text();
      });
      $('html').find('script').each(function(idx,element){
        var text = $(this).html();
        if(idx == 4){ 
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
    console.log(info);
  //  res.render('comic',{json:info});
    });
});
app.listen(3000, function () {
  console.log('app is listening at port 3000');
});