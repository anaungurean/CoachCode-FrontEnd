import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User } from 'lucide-react';

const EthanChat = () => {
    const [messages, setMessages] = useState([]);
    const [listening, setListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const speechSynthesisRef = useRef(window.speechSynthesis);

    const handleVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'ro-RO';
        recognition.start();

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);

        recognition.onresult = (event) => {
            const userMessage = event.results[0][0].transcript;
            setInputText(userMessage);
        };
    };

    const sendMessage = (message) => {
        setMessages([...messages, { text: message, from: 'user' }]);
        setInputText('');
        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
            .then(response => response.json())
            .then(botMessage => {
                setMessages(prevMessages => [...prevMessages, { text: botMessage, from: 'bot' }]);
                handleSpeech(botMessage);
            })
            .catch(error => console.error('Error:', error));
    };

   const handleSpeech = (text) => {
    let isMute = localStorage.getItem('isMute') === 'true'; 
    console.log(isMute);

    if (!isMute) {
        const utterance = new SpeechSynthesisUtterance(text);

        // Filter voices by language and gender (female)
        const voices = speechSynthesisRef.current.getVoices();
        const englishVoices = voices.filter(voice => voice.lang.startsWith('en') && voice.gender === 'female');

        // Choose the first available female English voice
        if (englishVoices.length > 0) {
            utterance.voice = englishVoices[0];
        } else {
            console.error("No female English voice available.");
            return;
        }

        speechSynthesisRef.current.speak(utterance);

        const checkMuteStatusInterval = setInterval(() => {
            isMute = localStorage.getItem('isMute') === 'true';
            if (isMute) {
                speechSynthesisRef.current.cancel();
                clearInterval(checkMuteStatusInterval);
            }
        }, 100);

        utterance.onend = () => clearInterval(checkMuteStatusInterval);
    }
};


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(inputText);
        }
    };

    useEffect(() => {
        const defaultMessage = "Hi! I'm Ethan, your Code Review Expert. Have bugs? Share your code, I'll give feedback to boost your skills!";
        setMessages([{ text: defaultMessage, from: 'bot' }]);
        handleSpeech(defaultMessage);
    }, []);

    return (
        <div className="relative mt-4 mr-4 border h-85p pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
            <div className="flex flex-col h-90p overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex justify-${message.from === 'user' ? 'end' : 'start'} mr-4`}>
                        <div className={`bg-${message.from === 'user' ? 'gray-200' : 'purple-100'} text-twilight-500 p-2 rounded-xl m-2`}>
                            <div className="text-sm font-semibold">{message.from === 'user' ? 'You' : 'Ethan'}</div>
                            <div className="flex items-center justify-center">
                                {message.from === 'bot' && <Bot size={20} className="mr-2" />}
                                {message.from === 'user' && <User size={20} className="mr-2" />}
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-10p">
                <div className="flex justify-row items-center h-12 bg-purple-100 rounded-xl ml-4 mr-4">
                    <button onClick={handleVoiceInput}>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-twilight-300 text-white ml-2">
                            {listening ?
                                <div className="animate-pulse"><Mic size={24} /></div> :
                                <Mic size={24} />
                            }
                        </div>
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="h-10 w-full ml-2 rounded-xl bg-purple-50 text-base text-twilight-300 px-2 border-2 border-gray-100 focus:outline-none focus:border-twilight-300 focus:border-2"
                        placeholder="Type a message..."
                    />
                    <button className="flex items-center justify-center h-8 w-24 rounded-full bg-twilight-300 text-white mr-2 ml-2"
                        onClick={() => sendMessage(inputText)}>
                        <Send size={24} className="" />
                        <p className="ml-2">Send</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EthanChat;
