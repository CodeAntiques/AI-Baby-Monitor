video="";
alarm="";
objects=[];
status="";
percentage=0;

function preload(){
alarm=loadSound("alarm.mp3");
}

function setup(){
    canvas=createCanvas(620,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modeloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function draw(){
    image(video,0,0,620,500);
    if (status != "") {
        objectDetector.detect(video,gotResults);
      for ( index = 0; index < objects.length; index++) {
     document.getElementById("status").innerHTML="Object has been detected";
           percentage=floor(objects[index].confidence * 100 )      ;
           fill("red");
           text(objects[index].label + percentage + "%" ,objects[index].x+15,objects[index].y+15 );
           noFill();
           stroke("red");
           rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height);
           if (objects[index].label=="person") {
               document.getElementById("detector").innerHTML="Baby Has been Found";
               alarm.stop();
           } else {
            document.getElementById("detector").innerHTML="Baby Has not been Found";
            alarm.play();
           }
      }
    }
}

function modeloaded(){
    console.log("Model has been loaded");
    status=true;
}


function gotResults(error,results){
    
    if (error) {
         console.error(error);
    } else {
        objects=results;
    }
}