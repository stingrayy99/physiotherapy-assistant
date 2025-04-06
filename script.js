let video;
let poseNet;
let poses = [];

function setup() {
   
    video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match video size
    canvas.width = 640;  
    canvas.height = 480; 

    console.log("Setting up PoseNet...");

    // Load ml5 PoseNet model
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", (results) => {
        poses = results;
        console.log("Poses received:", poses);  // Log pose data
        drawKeypoints(ctx, poses);
        drawSkeleton(poses, ctx);  // Call the new drawSkeleton function
    });

    // Start video stream
    startVideo();
}

// Ensure video loads properly
function startVideo() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
                console.log("Video stream started.");
            })
            .catch((err) => console.error("Error accessing webcam:", err));
    } else {
        alert("Your browser does not support webcam access.");
    }
}

// Model is loaded
function modelLoaded() {
    console.log("PoseNet model loaded!");
}

// Draw keypoints on canvas
function drawKeypoints(ctx, poses) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);

    poses.forEach((pose) => {
        pose.pose.keypoints.forEach((keypoint) => {
            if (keypoint.score > 0.6) {
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
    });
}

// Draw skeleton on canvas
function drawSkeleton(poses, ctx) {
    poses.forEach((pose) => {
        const skeleton = pose.skeleton;
        skeleton.forEach((bone) => {
            ctx.beginPath();
            ctx.moveTo(bone[0].position.x, bone[0].position.y);
            ctx.lineTo(bone[1].position.x, bone[1].position.y);
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    });
}

// Run setup when the page loads
window.onload = setup;

// Get Started Button code
const getStartedButton = document.getElementById('startButton');
const elementsToFade = [
    document.getElementById('image'),
    document.getElementById('heading'),
    document.getElementById('subheading'),
    document.getElementById('startButton')
];

startButton.addEventListener('click', () => {
    elementsToFade.forEach(element => {
        element.classList.add('fade-out');
    });
});
