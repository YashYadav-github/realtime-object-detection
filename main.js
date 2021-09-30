img = "";
status = "";
object = [];
function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', ModelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    // image(img, 0, 0, 640, 420);
    // fill("#f5672f");
    // text("Dog",65,50);
    // noFill();
    // stroke("#f5672f");
    // rect(60, 60, 300, 350);

    // fill("#f5672f")
    // text("Cat", 320 ,70);
    // noFill()
    // stroke("#f5672f");
    // rect(320, 80, 250, 330);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("num_obj").innerHTML = "Number of object detected are : " + object.length;
            fill(r, g, b);
            percentage = floor(object[i].confidence * 100); 
            text(object[i].label + "  " + percentage + "%", object[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y -40, object[i].width -105, object[i].height );

        }
    }

}

function ModelLoaded(){
    console.log("CocoSSD is loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
