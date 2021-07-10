var voiceList  = document.querySelector('#voiceList');
var txtSpeech  = document.querySelector('#txtSpeech');
var btnSpeak  = document.querySelector('#btnSpeak');

var tts = window.speechSynthesis;
var voices = [];

console.log(window.speechSynthesis.getVoices());

function GetVoices() {
    voices = tts.getVoices();
    voiceList.innerHTML = '';
    voices.forEach(voice => {
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang)
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });
    voiceList.selectedIndex = 0;
}


GetVoices();

if(speechSynthesis != undefined){
    speechSynthesis.onvoiceschanged = GetVoices;
}

btnSpeak.addEventListener('click', ()=> {
    var toSpeak  = new SpeechSynthesisUtterance(txtSpeech.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;

        }
    });
    tts.speak(toSpeak);
})
