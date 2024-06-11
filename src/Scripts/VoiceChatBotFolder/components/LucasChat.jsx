import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User } from 'lucide-react';
    

const LucasChat = () => {
    const [messages, setMessages] = useState([]);
    const [listening, setListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [, setConversationHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const speechSynthesisRef = useRef(window.speechSynthesis);
    const [jobTitle, setJobTitle] = useState('');
    const [generatedQuestions, setGeneratedQuestions] = useState([{}]);
    const currentQuestionIndex = useRef(0);
    const [finishedInterview, setFinishedInterview] = useState(false);

   
 
    const handleVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);

        recognition.onresult = (event) => {
            const userMessage = event.results[0][0].transcript;
            setInputText(userMessage);
        };
    };

const sendMessage = (message) => {
    const userMessage = {
        text: message,
        from: 'user',
    };
    console.log(userMessage);
    setMessages([...messages, userMessage]);
    setInputText('');

    let storedMessages = JSON.parse(localStorage.getItem('messagesLucas'));
    let lastBotMessage = '';
    if (storedMessages && storedMessages.length > 0) {
        for (let i = storedMessages.length - 1; i >= 0; i--) {
            if (storedMessages[i].from === 'bot') {
                lastBotMessage = storedMessages[i].text;
                break;
            }
        }
    }
     storedMessages = [...storedMessages, userMessage];

    if (lastBotMessage === "Hi! I'm Lucas, Technical Interview! Are you ready to take a mock Technical interview? Please type 'Yes' or 'No' to start." || lastBotMessage === 'I didn\'t get that. Please type "Yes" or "No" to start the mock Technical interview.') {
        if (message.toLowerCase() === 'yes') {
            const botMessageObject = {
                text: 'Great! First, I need to know for which position you are applying. Please type the job title.',
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech('Great! First, I need to know for which position you are applying. Please type the job title.');
        } else if (message.toLowerCase() === 'no') {
            const botMessageObject = {
                text: 'No problem! If you change your mind, I\'ll be here to help you prepare for your Technical interview.',
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech('No problem! If you change your mind, I\'ll be here to help you prepare for your Technical interview.');
            setFinishedInterview(true);
        } else {
            const botMessageObject = {
                text: 'I didn\'t get that. Please type "Yes" or "No" to start the mock Technical interview.',
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech('I didn\'t get that. Please type "Yes" or "No" to start the mock Technical interview.');
        }
    } else if (lastBotMessage === 'Great! First, I need to know for which position you are applying. Please type the job title.') {
        console.log(message);
        setJobTitle(message);

        const botMessageObject = {
            text: `Now select the number of question sets you want to practice for the position of ${message} between 3, 5, 10 and 15. For example, type "5" for 5 questions.`,
            from: 'bot',
        };

        setMessages(prevMessages => [...prevMessages, botMessageObject]);
        handleSpeech(`Now select the number of question sets you want to practice for the position of ${message} between 3, 5, 10 and 15. For example, type "5" for 5 questions.`);
    } else if (lastBotMessage === `Now select the number of question sets you want to practice for the position of ${jobTitle} between 3, 5, 10 and 15. For example, type "5" for 5 questions.` || lastBotMessage === 'I didn\'t get that. Please select the number of question sets you want to practice between 3, 5, 10 and 15.') {
        
        const number = parseInt(message);
        if (number === 3 || number === 5 || number === 10 || number === 15) {
            const botMessageObject = {
                text: `Great! You have selected ${number} questions. Let's start the mock Technical interview for the position of ${jobTitle}.`,
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech(`Great! You have selected ${number} questions. Let's start the mock Technical interview for the position of ${jobTitle}.`);
            fetchQuestion(jobTitle, number);
            
        } else {
            const botMessageObject = {
                text: 'I didn\'t get that. Please select the number of question sets you want to practice between 3, 5, 10 and 15.',
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech('I didn\'t get that. Please select the number of question sets you want to practice between 3, 5, 10 and 15.');
        }
    }
    
     if (currentQuestionIndex.current >= 1) {
     if (currentQuestionIndex.current < generatedQuestions.length) {
             const botMessageObject = {
                text: generatedQuestions[currentQuestionIndex.current],
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech(generatedQuestions[currentQuestionIndex.current]);
            currentQuestionIndex.current += 1;
        } else {
            const botMessageObject = {
                text: 'That\'s all the questions for now. In few seconds, I will provide Technical feedback for you. Please wait',
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            storedMessages = [...storedMessages, botMessageObject];
            handleSpeech('That\'s all the questions for now. In few seconds, I will provide Technical feedback for you. Please wait');
            console.log(storedMessages);
            fetchFeedback(storedMessages);
        }
    }
    
};

const fetchFeedback = async (interviewData) => {
    setIsThinking(true);
    try {
        const response = await fetch('http://localhost:5000/generateFeedbackTechnical', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ interviewData }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Technical Feedback generated:', data.feedback);
            setIsThinking(false);

            const botMessageObject = {
                text: data.feedback,
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech(data.feedback);
            setFinishedInterview(true);

         } else {
            console.error('Error generating Technical feedback:', data.error);
        }
    } catch (error) {
        console.error('Error fetching Technical feedback:', error);
    }
};

 
    
   const fetchQuestion = async (jobTitle, numberOfQuestions) => {
    setIsThinking(true);
    try {
        const response = await fetch('http://localhost:5000/generateTechnicalQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobTitle, numberOfQuestions }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Technical Questions generated:', data.questions);
            setIsThinking(false);
            setGeneratedQuestions(data.questions);
            console.log(data.questions[0]);
            const botMessageObject = {
                text: data.questions[0],
                from: 'bot',
            };
            setMessages(prevMessages => [...prevMessages, botMessageObject]);
            handleSpeech(data.questions[0]);
            currentQuestionIndex.current += 1;
        
        } else {
            console.error('Error generating Technical questions:', data.error);
        }
    } catch (error) {
        console.error('Error fetching Technical questions:', error);
    }
};





    const handleSpeech = (text) => {
    let isMute = localStorage.getItem('isMute') === 'true';
    if (!isMute) {
        const utterance = new SpeechSynthesisUtterance(text);

        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            const targetVoiceName = "Microsoft Andrew Online (Natural) - English (United States)";
            const targetVoice = voices.find(voice => voice.name === targetVoiceName);
             if (targetVoice) {
                utterance.voice = targetVoice;
            } else {
                console.warn(`Voice "${targetVoiceName}" not found. Using default voice.`);
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
        };

        if (window.speechSynthesis.getVoices().length !== 0) {
            setVoice();
        } else {
            window.speechSynthesis.onvoiceschanged = setVoice;
        }
    }
};


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(inputText);
        }
    };

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('messagesLucas'));
        if (storedMessages) {
            setMessages(storedMessages);
        } else {
            const defaultMessage = "Hi! I'm Lucas, Technical Interview! Are you ready to take a mock Technical interview? Please type 'Yes' or 'No' to start.";
            setMessages([{ text: defaultMessage, from: 'bot' }]);
            handleSpeech(defaultMessage);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('messagesLucas', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        const handleDeleteConversation = () => {
            const defaultMessage = "Hi! I'm Lucas, Technical Interview! Are you ready to take a mock Technical interview? Please type 'Yes' or 'No' to start.";
            setMessages([{ text: defaultMessage, from: 'bot'}]);
            setConversationHistory(messages.map(message => message.text));
            setJobTitle('');
            setGeneratedQuestions([{}]);
            currentQuestionIndex.current = 0;
            setFinishedInterview(false);

        };

        window.addEventListener('deleteConversationLucas', handleDeleteConversation);

        return () => {
            window.removeEventListener('deleteConversationLucas', handleDeleteConversation);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

const renderBotMessage = (text) => {
    return text.split('\n').map((line, index) => {
        
        // Replace phrases between " " with italicized versions
        line = line.replace(/"(.*?)"/g, '<span class="italic">$1</span>');
        line = line.replace(/Question/g, '<span class="font-semibold"> ⮚ Question</span>');
        line = line.replace(/Answer/g, '<span class="font-semibold"> ⮚ Answer</span>');
        line = line.replace(/\plus/g, '<span class="font-bold">+</span>');
         line = line.replace(/minus/g, '<span class="font-bold">-</span>');
         // Render the line with HTML content
        return (
            <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
        );
    });
};



    return (
        <div className="relative mt-4 mr-4 border h-85p pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
            <div className="flex flex-col h-90p overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex justify-${message.from === 'user' ? 'end' : 'start'} mr-4 `}>
                        <div className={`bg-${message.from === 'user' ? 'gray-200' : 'purple-100'} text-twilight-500 p-2 rounded-xl m-2 
                                ${message.from === 'user' ? 'ml-40' : 'mr-40'}
                              `}>
                            <div className="flex items-center text-sm font-semibold">{message.from === 'user' ? 'You' : 'Lucas'}</div>
                            <div className="flex items-column">
                                {message.from === 'bot' && <Bot size={20} className="mr-2" />}
                                {message.from === 'user' && <User size={20} className="mr-2" />}
                            </div>
                            <div>
                                {message.from === 'bot' && message.text &&
                                    renderBotMessage(message.text)    
                                }
                                {message.from === 'user' && message.text}
                            </div>
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex justify-start mr-4 transition-colors duration-500">
                        <div className="bg-purple-100 text-twilight-500 p-2 rounded-xl m-2">
                            <div className="text-sm font-semibold">Lucas</div>
                            <div className="flex items-center justify-center">
                                <Bot size={20} className="mr-2" />
                                <div className="animate-pulse">Lucas is thinking...</div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-10p">
                <div className="flex justify-row items-center h-12 bg-purple-100 rounded-xl ml-4 mr-4">
                    <button onClick={handleVoiceInput}
                            disabled={isThinking || finishedInterview}
                        >
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
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="flex-grow bg-white rounded-xl p-2 ml-2 outline-none"
                        disabled={isThinking || finishedInterview}
                    />
                    <button onClick={() => sendMessage(inputText)} title='Send message'
                            disabled={isThinking || finishedInterview}
                    >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-twilight-300 text-white ml-2 mr-2">
                            <Send size={24} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

 
export default LucasChat;
