window.onload = function () {
  let voiceList = document.querySelector("#voiceList");
  let txtSpeech = document.querySelector("#txtSpeech");
  let btnSpeak = document.querySelector("#btnSpeak");
  let btnPause = document.querySelector("#pause");
  let btnResume = document.querySelector("#resume");

  let tts = window.speechSynthesis;
  let voices = [];
  tts.cancel();
  console.log(window.speechSynthesis.getVoices());

  function GetVoices() {
    voices = tts.getVoices();
    voiceList.innerHTML = "";
    voices.forEach((voice) => {
      let listItem = document.createElement("option");
      listItem.textContent = voice.name;
      listItem.setAttribute("data-lang", voice.lang);
      listItem.setAttribute("data-name", voice.name);
      voiceList.appendChild(listItem);
    });
    voiceList.selectedIndex = 0;
  }

  GetVoices();

  if (speechSynthesis != undefined) {
    speechSynthesis.onvoiceschanged = GetVoices;
  }

  
    btnSpeak.addEventListener("click", () => {
      let toSpeak = new SpeechSynthesisUtterance(txtSpeech.value);
      let selectedVoiceName =
        voiceList.selectedOptions[0].getAttribute("data-name");
        if (txtSpeech.value !== "") {
      voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
          toSpeak.voice = voice;
        }
      });
      tts.cancel();
      tts.speak(toSpeak);
      if (window.speechSynthesis.speaking) {
        btnPause.classList.remove("d-none");
        btnSpeak.classList.add("d-none");
      } else {
      }
      toSpeak.onend = () => {
        btnPause.classList.add("d-none");
        btnResume.classList.add("d-none");
        btnSpeak.classList.remove("d-none");
      };
    }
    });

  btnPause.addEventListener("click", () => {
    tts.pause();
    btnPause.classList.add("d-none");
    btnResume.classList.remove("d-none");
  });

  btnResume.addEventListener("click", () => {
    tts.resume();
    btnPause.classList.remove("d-none");
    btnResume.classList.add("d-none");
  });
};
