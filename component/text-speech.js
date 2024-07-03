
export function Text_speech(message){
        let utterance = new SpeechSynthesisUtterance(message);
        let voicesArray = speechSynthesis.getVoices();
        utterance.voice = voicesArray[2];    
        speechSynthesis.speak(utterance);
    }