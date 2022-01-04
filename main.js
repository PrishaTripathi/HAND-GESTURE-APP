prediction_1 =""
prediction_2 =""
Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});
camera= document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
Webcam.snap(function(data_uri)
{
document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
}
);
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6EBe_hRpc/model.json',modelLoaded);
function modelLoaded()
{
console.log('Model Loaded!');
}
function speak()
{
var synth=window.speechSynthesis;
speak_data_1="The First Prediction is "+prediction_1;
speak_data_2="The Second Prediction is "+prediction_2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}
function check()
{
img=document.getElementById('captured_image');
classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
if(error)
{console.error(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
prediction_1=results[0].label;
prediction_2=results[1].label;
speak(); 
if(results[0].label == "stone") 
{ document.getElementById("update_emoji").innerHTML = "&#9994;"; 
} if(results[0].label == "paper") { document.getElementById("update_emoji").innerHTML = "&#9995;"; 
} if(results[0].label == "scissors") { document.getElementById("update_emoji").innerHTML = "&#9996;"; 
} if(results[1].label == "stone") { document.getElementById("update_emoji2").innerHTML = "&#9994;"; 
} if(results[1].label == "paper") { document.getElementById("update_emoji2").innerHTML = "&#9995;"; 
} if(results[1].label == "scissors") 
{ document.getElementById("update_emoji2").innerHTML = "&#9996;"; }
}
}