// UI comp
const startBtn = document.createElement("button");
startBtn.innerHTML = "Start listening";
const result = document.createElement("div");
const processing = document.createElement("p");
document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
    startBtn.remove();
    result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = event => {
        const last = event.results.length - 1;
        const res = event.results[last];
        const text = res[0].transcript;
        if (res.isFinal) {
            processing.innerHTML = "processing ....";

            const response = process(text);
            const p = document.createElement("p");
            p.innerHTML = ` `;
            processing.innerHTML = "";
            result.appendChild(p);

            // read it out
            speechSynthesis.speak(new SpeechSynthesisUtterance(response));
        } else {
            processing.innerHTML = `listening: ${text}`;
        }
    }
    let listening = false;
    toggleBtn = () => {
        if (listening) {
            recognition.stop();
            startBtn.textContent = "Start listening";
        } else {
            recognition.start();
            startBtn.textContent = "Stop listening";
        }
        listening = !listening;
    };
    startBtn.addEventListener("click", toggleBtn);

}

// processor
function process(rawText) {
    let text = rawText.replace(/\s/g, "");
    text = text.toLowerCase();
    rawText=rawText.toLowerCase();
    let response=null;
   if(rawText.includes('my birthday')){
       response="what you think of yourself? How the heck would I know your birthday!";
   }
   if(rawText.includes('joke')){response="Have you brought Money?";}
   if(rawText.includes('activate')){response="HI SIR/MA'AM ! how can I help you ?";}
   if(rawText.includes('good')){response="I am happy to hear that";}
   if(rawText.includes('game')){response="who is your favourite Avenger character ? Your favourite character will guess your personality trait ?"; }
   if(rawText.includes('captain america')){ response="You are hardworking and productive you follow your own path,you are understanding and loyal towards the people whom you like";}
   if(rawText.includes('iron man')){response="you are creative,genius and have a charismatic personality,you like to be around peoples";}
   if((rawText.includes('thor'))){response="you can do anything which you want,you are strong willed person as long as you can control your emotions";}
   if((rawText.includes('doctor strange'))){response="you are clever and have great intuition power,you have the ability to identify what makes other vulnerable";}
   if(rawText.includes('black widow')){response="you are  a logical and practical person,you are very focused towards your goal";}
   if(rawText.includes('black panther')){response="you have an adventurous streak,you are very optimistic and confident about the things you do";}
   if(rawText.includes('spider-man')){response="you are intelligent person,you are usually jolly and love to crack jokes";}
   if(rawText.includes('hulk')){response="you have a great strength,you get angry very easily but you also have a very good heart";}
   if((rawText.includes('aur'))){response="you can do anything which you want,you are strong willed person as long as you can control your emotions";}
   if((rawText.includes('thought'))){response="you can do anything which you want,you are strong willed person as long as you can control your emotions";}
   if((rawText.includes('hot'))){response="you can do anything which you want,you are strong willed person as long as you can control your emotions";}
   if((rawText.includes('thor character'))){response="you can do anything which you want,you are strong willed person as long as you can control your emotions";}
   if (!response) {
        window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
        return `I found some information for ${rawText}`;
    }
    return response;
}