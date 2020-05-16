    var w = window.innerWidth
    var h = window.innerHeight
    var canvas =  document.createElement("canvas");
    var ctx  = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.id = "create";
    canvas.style= "position:absolute;z-index:-1;"
    document.body.appendChild(canvas);
    document.body.style.background = "url('"+create.toDataURL()+"')";
 function rand(min, max) {
            return parseInt(Math.random() * (max - min )+1 + min);
        }


    function Round()
    {
      this.r = rand(1,10);
      this.diam = this.r*2;
      var x = rand(0,canvas.width-this.r);
      this.x = x<this.r?this.r:x;
      var y = rand(0,canvas.height-this.r);
      this.y = y<this.r ? this.r:y;

      var speed = rand(2,4)/10;
      this.speedX = rand(0,4)>2?speed:-speed;
      this.speedY = rand(0,4)>2?speed:-speed;
      this.color = 'rgba(222,120,120,0.2)';
 
    }
    Round.prototype.draw = function()
    {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
    }
   Round.prototype.move = function()
   {
     this.x += this.speedX;
     if (this.x >canvas.width || this.x < 0)
     {
       this.speedX *= -1;
       this.x = this.r
     }
     this.y += this.speedY;
     if (this.y > canvas.height || this.y < 0)
     {
       this.speedY *= -1;
     }
   }
   var allRound = [];
   function initRound()
   {
     for(var i = 0;i<30;i++)
     {
       var obj = new Round();
       obj.draw();
       obj.move();
       allRound.push(obj);
     }
   }
   initRound();
   var dxdy = [];
   function roundMove()
   {
     ctx.clearRect(0,0,canvas.width,canvas.height);
     for (var i = 0;i <allRound.length;i++)
     {
       var round = allRound[i];
       round.draw();
       round.move();
       dxdy[i]= {
	  dx:round.x,
	  dy:round.y

	};
       var dx = dxdy[i].dx;
       var dy = dxdy[i].dy;
       for (var j= 0;j<i;j++)
       {
	  var sx = dxdy[j].dx;
	  var sy = dxdy[j].dy;
	  I = Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy));
	  var C = 1/I*7-0.009;
	  var o = C > 0.03?0.03:C;
	  if(I<300){
              ctx.strokeStyle = 'rgba(222,120,120,0.1)';
	      ctx.beginPath();
	      ctx.lineWidth = 0.5;
	      ctx.moveTo(dxdy[i].dx,dxdy[i].dy);
	      ctx.lineTo(dxdy[j].dx,dxdy[j].dy);
	      ctx.closePath();
	      ctx.stroke();
         }
       }
     }
  window.requestAnimationFrame(roundMove);
   }
  roundMove();   