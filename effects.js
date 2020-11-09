let playStopButton = document.querySelector("#playStopButton");
let isPlaying = false;

let context = new AudioContext();
let sound = new Audio ("Azrael.wav");
let source = context.createMediaElementSource(sound);
let compressor = context.createDynamicsCompressor();
let gain = context.createGain();
let stereoPanner = context.createStereoPanner();
let delay = context.createDelay(4.0);

source.connect(gain);
gain.connect(delay);
delay.connect(stereoPanner);
stereoPanner.connect(context.destination);

document.querySelector("#gainSlider").addEventListener("input", function (e) {
    let gainValue = (this.value / 50);
    document.querySelector("#gainOutput").innerHTML = gainValue + " dB";
    gain.gain.value = gainValue;
});

document.querySelector("#panningSlider").addEventListener("input", function (e) {
    let panValue = ((this.value - 50) / 50);
    document.querySelector("#panningOutput").innerHTML = panValue + " LR ";
    stereoPanner.pan.value = panValue;

});

document.querySelector("#delaySlider").addEventListener("input", function (e) {
    let delayValue = (this.value / 25);
    document.querySelector ("#delayOutput").innerHTML = delayValue + " sec";
    delay.delayTime.value = delayValue;

});

playStopButton.addEventListener("click", function() {
    if (isPlaying) {
        sound.pause();
        playStopButton.innerHTML ="PLAY";
    } else {
        playStopButton.innerHTML = "STOP";
        sound.play();

    }

    isPlaying = !isPlaying;
})

sound.addEventListener("ended", function (){
    isPlaying = false;
    playStopButton.innerHTML = "PLAY"
})