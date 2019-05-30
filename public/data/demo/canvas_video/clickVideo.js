var video;
var copy;
var copycanvas;
var draw;
var first=true;
//小方块的大小
var TILE_WIDTH = 32;
var TILE_HEIGHT = 24;
//方块中心位置
var TILE_CENTER_WIDTH=16;
var TILE_CENTER_HEIGHT=12;

//全局变量，根据视屏大小定义画布大小
var COPY_WIDTH=640;
var COPY_HEIGHT=360;
var DRAW_WIDTH=window.innerWidth*0.99;
var DRAW_HEIGHT=window.innerHeight*0.99;

var SOURCERECT = {x:0,y:0,width:0,height:0};
var PAINTRECT={x:0,y:0,width:DRAW_WIDTH,height:DRAW_HEIGHT};


function init(){
	//初始化画布
	video=document.getElementById('sourceid');
	copycanvas=document.getElementById('sourcecopy');
	copycanvas.width=COPY_WIDTH;
	copycanvas.height=COPY_HEIGHT;
	copy=copycanvas.getContext("2d");//获取2d绘图环境
	var showcanvas=document.getElementById('sourceshow');
	showcanvas.width=DRAW_WIDTH;
	showcanvas.height=DRAW_HEIGHT;
	draw=showcanvas.getContext("2d");
	/*每隔33毫秒绘制一帧canvas*/
	setInterval("processFrame()", 33);
	/*鼠标点击屏幕事件*/
	showcanvas.addEventListener('mousedown',dropBomb,false);
	showcanvas.addEventListener('mousedown',dropBomb,false);
	//setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
}
//后面用于小方块旋转角度使用
var RAD = Math.PI/180;
//存储小方块信息的数组
var tiles = [];
/*每帧画布的绘制*/
function processFrame(){
	//video.duration 属性返回当前音频/视频的长度，以秒计。
	//isNaN() 函数用于检查其参数是否是非数字值。
	if(!isNaN(video.duration)){
		if(SOURCERECT.width==0)
		{
			SOURCERECT={x:0,y:0,width:video.videoWidth,height:video.videoHeight};
			//初始化小方块
			createTiles();
		}
	}
	//绘制拷贝用的copy canvas画布
	copy.drawImage(video,0,0);//drawImage() 方法在画布上绘制图像、画布或视频。
	draw.clearRect(PAINTRECT.x, PAINTRECT.y,PAINTRECT.width,PAINTRECT.height);//clearRect() 方法清空给定矩形内的指定像素
	//绘画每一帧之前清空前一帧
    /*根据栈tiles绘制每一个小tile*/
	for (var i = 0; i <tiles.length; i++) {
		var tile=tiles[i];
		if(tile.force>0.0001){
			tile.moveX *= tile.force;//移动的x距离（根据force计算，越靠近点击的中心离原来的位置越远，回来的一帧移动距离越大）
			tile.moveY *= tile.force;//移动的y距离
			tile.moveRotation *= tile.force;//转动的角度
			tile.currentX += tile.moveX;//移动后的位置
			tile.currentY += tile.moveY;
			tile.rotation += tile.moveRotation;//转动后的角度
			tile.rotation %= 360;
			tile.force *= 0.9;//force每渲染一帧值都减少，直到小于0.0001
			if(tile.currentX <= 0 || tile.currentX >= PAINTRECT.width){
				tile.moveX *= -1;
				//超出边界左右
			}
			if(tile.currentY <= 0 || tile.currentY >= PAINTRECT.height){
				tile.moveY *= -1;
				//超出上下边界
			}
		}else if(tile.rotation != 0||tile.currentX != tile.originX || tile.currentY != tile.originY)//判断没有回来到原来的位置和角度
		{
			var diffx=(tile.originX-tile.currentX)*0.2;
			var diffy=(tile.originY-tile.currentY)*0.2;
			var diffRot=(0-tile.rotation)*0.2;
			if(Math.abs(diffx)<0.5)//Math.abs计算绝对值的数值表达式(距离的0.2倍小于0.5为最后一步，接下来回到原位)
			{
				tile.currentX = tile.originX;
			}else{//距离的0.2超过0.5，那么加上距离的0.2再次渲染
				tile.currentX += diffx;
			}
			if(Math.abs(diffy)<0.5)//Math.abs计算绝对值的数值表达式
			{
				tile.currentY = tile.originY;
			}else{
				tile.currentY += diffy;
			}
			if(Math.abs(diffRot) < 0.5){
				tile.rotation = 0;
			}else{
				tile.rotation += diffRot;
			}
		}else{//回到原来的位置
			tile.force  = 0;
		}
		draw.save();//save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
		draw.translate(tile.currentX,tile.currentY);
		draw.rotate(tile.rotation*RAD);
		//从copycanvas获取数据，根据数组中tile[i]的数据画一个小方格
		draw.drawImage(copycanvas, tile.videoX, tile.videoY, TILE_WIDTH, TILE_HEIGHT, -TILE_CENTER_WIDTH, -TILE_CENTER_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
		draw.restore();//restore() 方法从栈中弹出存储的图形状态并恢复 CanvasRenderingContext2D 对象的属性、剪切路径和变换矩阵的值。
	}
}
/*把视屏分成根据视屏屏幕大小分成300个tile,栈用于存储每个tile的位置，旋转角度，中心等信息，用于绘制展示页面的绘制*/
function createTiles(){
	var offsetX=TILE_CENTER_WIDTH+(PAINTRECT.width-SOURCERECT.width)/2;
	var offsetY=TILE_CENTER_HEIGHT+(PAINTRECT.height-SOURCERECT.height)/2;
	var y=0;
	while (y<SOURCERECT.height) {
		var x=0;
		while(x<SOURCERECT.width){
			var tile=new Tile();
			tile.videoX=x;
			tile.videoY=y;
			tile.originX=offsetX+x;
			tile.originY=offsetY+y;
			tile.currentX=tile.originX;
			tile.currentY=tile.originY;
			tiles.push(tile);
			x+=TILE_WIDTH;
		}
		y+=TILE_HEIGHT;
	}
}
/*Tile对象用于存储每个小块的信息*/
function Tile(){
	this.originX=0;
	this.originY=0;
	this.currentX=0;
	this.currentY=0;
	this.rotation=0;
	this.force=0;
	this.moveX=0;
	this.moveY=0;
	this.moveRotation=0;
	this.videoX=0;
	this.videoY=0;
}
/*计算出点击在显示的canvas画布的位置*/
function dropBomb(evt){
	var posx=0;
	var posy=0;
	var e=evt||event;
	//clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。客户区指的是当前窗口。
	//pageX() 属性是鼠标指针的位置，相对于文档的左边缘。
	if(e.pageX||e.pageY){
		posx=e.pageX;
		posy=e.pageY;
	}else if(e.clientX || e.clientY){
		/*有两个值一个是：scrollTop一个是scrollLeft
		第一个代表页面利用滚动条滚动到下方时，隐藏在滚动条上方的页面的高度；
		第二个代表页面利用滚动条滚动到右侧时，隐藏在滚动条左侧的页面的宽度*/
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	/*obj.offsetTop 指 obj 相对于版面或由 offsetParent 属性指定的父坐标的计算上侧位置，整型，单位像素。
	obj.offsetLeft 指 obj 相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置，整型，单位像素。*/
	var canvasX=posx-this.offsetLeft;
	var canvasY=posy-this.offsetTop;
	explode(canvasX,canvasY);
	if(first)
	{
		video.play();
		first=false;
		//musictype=true;
		//musicOn.setAttribute("class", "music on");
	}
}
function explode(x,y){
	for(var i=0;i<tiles.length;i++)
	{
		var tile=tiles[i];
		var xdiff=tile.currentX-x;
		var ydiff=tile.currentY-y;
		var dist=Math.sqrt(xdiff*xdiff+ydiff*ydiff);//sqrt根号  dist为tile碎片到点击点的距离
		var randRange=220+(Math.random()*30);
		//randRange值的计算方式？？？？不太了解250是从哪个值计算而来
		var range=randRange-dist;
		var force = 3*(range/randRange);//越靠近force越大
		if(force>tile.force){//如果当前的force已经大图要赋值给的force那么不再赋值
			tile.force=force;
			var radians=Math.atan2(ydiff, xdiff);//atan2(Y2-Y1,X2-X1)所表达的意思是坐标原点为起点，指向(x,y)的射线在坐标平面上与x轴正方向之间的角的角度。
			tile.moveX=Math.cos(radians);
			tile.moveY=Math.sin(radians);
			tile.moveRotation=0.5-Math.random();
			//console.log('tile.moveX:'+tile.moveX+'tile.moveY:'+tile.moveY+'tile.moveRotation:'+tile.moveRotation);

		}
	}
	tiles.sort(zindexSort);//sort() 方法用于对数组的元素进行排序。zindexSort可选。规定排序顺序。必须是函数。
	processFrame();//渲染小方块，此刻小方块的的位置和旋转较多变化了。
}
//排序小方块(根据force的大小)
function zindexSort(a,b){
	return (a.force-b.force);
}
window.onload=init;
