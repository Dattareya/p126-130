leftwristscore = 0;
rightwristscore = 0;

leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;

songstatus="";
song1="";
song2="";
song1status="";
song2status="";

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes);
}
function draw()
{
    image(video,0,0,600,500);
    fill("#00ff8c");
    stroke("blue");
    circle(rightwristx, rightwristy, 20);

    song1status= song1.isPlaying();
    song2status= song2.isPlaying();

    if (leftwristscore > 0.2) {
        circle(leftwristx, leftwristy, 20);
        song2.stop();

        if(song1status==false)
        {
            song1.play();
            document.getElementById("song").innerHTML="Kesariya By Brahmastra";
            
        }
    }
    if (rightwristscore > 0.2) {
        circle(rightwristx, rightwristy, 20);
        song1.stop();

        if(song2status==false)
        {
            song2.play();
            document.getElementById("song").innerHTML="Naacho Baacho By RRR";
            
        }
    }

}
function modelloaded() {
    console.log("posenetloaded");
}
function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        righttwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        leftwristscore = results[0].pose.keypoints[9].score;
        rightwristscore = results[0].pose.keypoints[10].score;
    }
}
function preload() {
    song1 = loadSound("kesariya.webm");
    song2 = loadSound("Naacho.webm");
}

