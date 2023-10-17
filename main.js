function setup (){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";
    video.hide();


}


status = "";
objects = [];


function modelLoaded(){
    console.log("Modelo cargado");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);

    }else{
        console.log(results);
        objects = results;
    }

}



function draw(){
    image(video, 0 , 0, 380, 380);
    
    if(status != "")
    {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Estado; objeto detectado:" 
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x , objects[i].y);
            noFill();
            stroke(r,g,b);
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(objects[i].label == "person") {
             document.getElementById("number_of_objects").innerHTML = "Se encontró el bebé.";
              console.log("stop");
               song.stop(); 

            }
            else{
                document.getElementById("number_of_objects").innerHTML = "No encontró el bebé.";
                console.log("play");
                 song.stop(); 

            }
            
        }
        if(objects.length == 0) {
             document.getElementById("number_of_objects").innerHTML = "No se encontró el bebé."; 
             console.log("play"); 
             song.play();
             }

    }
   

  
}


