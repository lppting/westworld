var fs = require('fs');
var path = require('path');
var join = require('path').join;
var crypto = require('crypto');
var ffmpeg = require('fluent-ffmpeg');
const FileUrl = 'E://Movies/';
function CaptureImg(fUrl){
	try{
		let imageName = '';
		let ImgName = fUrl.substring(fUrl.lastIndexOf('/')+1);
		let fileName = fUrl.substring(fUrl.lastIndexOf('/')+1).split('.');
		let BaseTo = Buffer(fUrl).toString('base64');
		let ForBase = Buffer(fUrl, 'base64').toString()
		if( ForBase.indexOf('|') > 0){
            ForBase = ForBase.replace('|','/')
        };
		let md5To = crypto.createHash('md5').update(fUrl).digest("hex");
		console.log(ForBase+'><><><><><');
		ffmpeg(FileUrl+ForBase)
		    .on('filenames',(fileName)=>{
		    	imageName = fileName[0];
		    })
		    .on('end',()=>{
		    	path.resolve(imageName);
		    })
		    .screenshots({
		    	timestamps: ['00:08:00'],
		    	folder: 'E:/img/',
		    	size: '640x320',
		    	filename: md5To
		    });

	}
	catch(err){
		console.log(err);
	}
}
function ShortName(obj){
	var name = '';
	if( obj.indexOf('Mp4Ba') >= 0 ){
		name = Mp4ba(obj);
	}
	else if( obj.indexOf('westworld') >= 0){
		var title =obj.split(".")[0];
        var Season = obj.split(".")[1]
        var parseStr = /[1-9]+/g;
        name = title.charAt(0).toUpperCase() + title.slice(1) +" 第" + EtoC(parseInt(Season.match(parseStr)[0])) + '季第'+Season.match(parseStr)[1]+'集';
	}
    else{
    	var title =obj.split(".")[0];
    	name = title.charAt(0).toUpperCase() + title.slice(1) +" "
    }
    return name;
}

function EtoC(num){
    var n = '';
    switch (num){
        case 1:
            n = '一';
            break;
        case 2:
            n = '二'
            break;
        case 3:
            n = '三';
            break;
        case 4:
            n = '四';
            break;
        case 5:
            n = '五';
            break;
        case 6:
            n = '六';
            break;
        case 7:
            n = '七';
            break;
        case 8:
            n = '八';
            break;
        case 9:
            n = '九';
            break;   
    }
    return n;
}
function Mp4ba(ba){
//	console.log(ba);
    var title = ba.split(".")[0];
    var Season = ba.split(".")[1]
    var parseStr = /[1-9]+/g;
    var name = title;
    //+' 第'+EtoC(parseInt(Season.match(parseStr)[0]))+'集'
    return name;
}

module.exports={
	captureImg:CaptureImg,
    shortname: ShortName
}