img="";
status="";
objects=[];

function preload(){
    img=loadImage("bathroom.jpg")
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded !")
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function draw(){
    image(img,0,0,380,380);

    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(img,gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+ objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(object[i].label+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}