const curtain = document.querySelector('#curtain');

const textBox = document.querySelector('#textBox');
const open = document.querySelector('#open');
const close = document.querySelector('#close');

function openBox() {
    textBox.classList.add('show');
    curtain.classList.add('show');
}

function closeBox() {
    textBox.classList.remove('show');
    curtain.classList.remove('show');
}

open.addEventListener('click', openBox);

close.addEventListener('click', closeBox);

curtain.addEventListener('click', closeBox);

document.addEventListener('keydown', (e) => {
    if (e.keyCode == 27) {
        closeBox();
    } else if (e.keyCode == 84) {
        openBox();
    }
});

const msg = new SpeechSynthesisUtterance();
let voiceSamples = [];
const voices = document.querySelector('#voices');
const text = document.querySelector('#text');
const read = document.querySelector('#read');

function populateVoices() {
    voiceSamples = this.getVoices();
    voices.innerHTML = voiceSamples
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voiceSamples.find(voice => voice.name == this.value);
}

function setText() {
    msg.text = this.value;
}

function readText() {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voices.addEventListener('change', setVoice);
text.addEventListener('input', setText);
read.addEventListener('click', readText);

const samples = document.querySelectorAll('.samples__box');
samples.forEach(sample => sample.addEventListener('click', speakSample));

function speakSample() {
    msg.text = this.children[1].textContent;
    readText();
}