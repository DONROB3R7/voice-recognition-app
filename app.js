// api

// Fetch functions Jokes 
async function jokes(){
    let jokesDbData  = 'https://api.chucknorris.io/jokes/random';
    
    try {
        let res  =  await fetch(jokesDbData);
        return await res.json();
    } catch (error){
        console.log(error);
    }
}

// Fetch function randomMeal
async function randomMeal(){
    let mealDbData  = 'https://www.themealdb.com/api/json/v1/1/random.php';
    
    try {
        let res  =  await fetch(mealDbData);
        return await res.json();
    } catch (error){
        console.log(error);
    }
}




function darkMode(){
    document.body.style.backgroundColor = "black";
}



const btn = document.querySelector('.talk');


const greetings = ['Im good you little piece of love'];
const catFunct = []



const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();


 recognition.onstart = () => {
    console.log('voice is activated, you can to microphonee');
};

recognition.onresult = function(event){
     const current = event.resultIndex;
     const transcript = event.results[current][0].transcript;
     recognition.stop();
     readOutLoud(transcript);
};


// add the listener to the btn 

btn.addEventListener('click', ()=> {
     recognition.start();
})

async  function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    console.log(message);
    if( message.includes('hello')){
        speech.text = greetings[0];
    } 
    
    if(message.includes('joke')){
        let jokesDbDataJson  = await jokes();
        speech.text = jokesDbDataJson.value;
        console.log(jokesDbDataJson);
        console.log('joke');
    }

    if(message.includes('eat')){
        let mealDbDataJson = await randomMeal();
        console.log(mealDbDataJson.meals[0].strMeal);
        speech.text = `You can eat an ... ${mealDbDataJson.meals[0].strMeal} is good for a fatty like you ` ;
        console.log('eat')
    }


 
    if(message.includes('dark')){
        darkMode();
    }

    if(message.includes('white')){
        document.body.style.backgroundColor = "white";
    }

    //speech.text = greetings[0];
    speech.volume = 1;
    speech.rate = 0.8;
    speech.pitch = 0.7;
    
    window.speechSynthesis.speak(speech);
}

recognition.onend = function(){
    // Continuation lisen;
    recognition.start();
};