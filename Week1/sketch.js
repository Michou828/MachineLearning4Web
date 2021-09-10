//This code is modifuled on top of the code mentioned below
//This sktech using object detection to puse a song 
//when the camera caputres a phone in the frame

// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let video;
let detector;
let detections = [];
let phone = false;
let song;


function preload() {
  soundFormats('mp3', 'ogg');
  song = loadSound('songtest.mp3');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  video.hide();
  song.play();
}

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    if (object.label == "cell phone"){
      phone = true;
      i = detections.length;
    } else {
      phone = false;
    }
  }
  
  if (song.isPlaying() && phone){
    song.pause();
  }
  
  if (song.isPaused() && !phone){
    song.play();
  }
}