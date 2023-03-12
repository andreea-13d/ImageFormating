// let btn = document.getElementById("btnClick")
// // var image = document.getElementById("image")

// btn.onclick = function () {
// 	fetch("https://dog.ceo/api/breeds/image/random")
// 		.then(res => res.json())
// 		.then(result => {
// 			console.log(result)
// 			image.src = result.message
// 			// ctx.drawImage(image,0,0,canvas.width,canvas.height)
// 		})
// 		.catch(err => console.log(err))
// }

var json = '{"message": "https://images.dog.ceo/breeds/spaniel-sussex/n02102480_582.jpg", "status": "success"}'; //salvam continutul jsonului intr-o variabila
var obj = JSON.parse(json); //transformarea jsonului in obiect

var canvas = document.getElementById("canvas"); 	//adresa catre canvas
var ctx = canvas.getContext("2d"); 	//contextul "desenului" din canvas, in acest caz in 2d

var img = new Image();	//instantiere poza
img.onload = start;	//mergem catre functia start
//img.src = obj.message;	//incarcare poza din json
img.src="catel.png";
function oneSecond() {	//functie pentru utilizarea lui setTimeout
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('resolved');
		}, 1000);	//delay 1s
	});
}

async function start() {
0.
	await oneSecond();	//asteptam o secunda apeland functia..
	canvas.width=img.width;
	canvas.height=img.height;

	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  //afisare imagine originala
	
	var time;
	await oneSecond();		//asteptam o secunda apeland functia..

	time = mirror2Img(img);		//afisare imagine oglindita pe orizontala	
	await oneSecond();		//asteptam o secunda apeland functia..
	window.alert("Timp de rulare " + time + "ms");

	await oneSecond();
	time=averageGrayScale(img); // imagine alb negru
	await oneSecond();
	window.alert("Timp de rulare " + time + "ms");

}

function mirror2Img(img) {
	const start = Date.now();
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	var scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var scannedData = scannedImage.data;
	let a;
	console.log()
	for (let row = 0 ; row < scannedImage.height; row += 1) {
		
	for (let coll = 0 ; coll <scannedImage.width/2 ; coll += 1) 
		{	
			index=(row*canvas.width+coll)*4;

			a = scannedData[index+3] ;
			scannedData[index+3]=scannedData[((canvas.width*(row+1)-1)*4-coll*4)+3];
			scannedData[((canvas.width*(row+1)-1)*4-coll*4)+3]=a;

			a = scannedData[index+2] ;
			scannedData[index+2]=scannedData[((canvas.width*(row+1)-1)*4-coll*4)+2];
			scannedData[((canvas.width*(row+1)-1)*4-coll*4)+2]=a;

			a = scannedData[index+1] ;
			scannedData[index+1]=scannedData[((canvas.width*(row+1)-1)*4-coll*4)+1];
			scannedData[((canvas.width*(row+1)-1)*4-coll*4)+1]=a;

			a = scannedData[index] ;
			scannedData[index]=scannedData[((canvas.width*(row+1)-1)*4-coll*4)];
			scannedData[((canvas.width*(row+1)-1)*4-coll*4)]=a;
			
		}

	}
	scannedImage.data = scannedData;
	ctx.putImageData(scannedImage, 0, 0);
	const stop = Date.now();
	return stop-start;
}

function averageGrayScale(img) 
	{
		const start = Date.now();
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		var scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
		console.log(scannedImage);
		var scannedData = scannedImage.data;
		for (let i = 0 ; i < scannedData.length ; i += 4) // 4 for new pixel
		{
			var total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2]; // rgb
			var averageColorValue = total / 3;
	
			scannedData[i] = averageColorValue;
			scannedData[i + 1] = averageColorValue;
			scannedData[i + 2] = averageColorValue;
		}
		
		scannedImage.data = scannedData;
		ctx.putImageData(scannedImage, 0, 0);
		const stop = Date.now();
		return stop-start;
	}
