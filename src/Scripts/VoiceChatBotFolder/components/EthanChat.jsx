import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User, Code } from 'lucide-react';
import PropTypes from 'prop-types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const EthanChat = ({ openPopup, selectedLanguage, enteredCode }) => {
    const [messages, setMessages] = useState([]);
    const [listening, setListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const speechSynthesisRef = useRef(window.speechSynthesis);

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
        setMessages([...messages, { text: message, from: 'user' }]);
        setInputText('');
        setIsThinking(true);
        console.log(selectedLanguage, enteredCode);

        const messageToSend = selectedLanguage && enteredCode ? `${message} ${selectedLanguage} ${enteredCode}` : message;

        fetch('http://localhost:5000/chatEthan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: messageToSend,
                conversation_history: conversationHistory
            }),
        })
            .then(response => response.json())
            .then(data => {
                setIsThinking(false);
                const { response: botMessage, conversation_history: updatedConversationHistory } = data;
                setConversationHistory(updatedConversationHistory);
                setMessages(prevMessages => [...prevMessages, { text: botMessage, from: 'bot' }]);
                handleSpeech(botMessage);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsThinking(false);
            });
    };

    const handleSpeech = (text) => {
        let isMute = localStorage.getItem('isMute') === 'true';
        console.log(isMute);

        if (!isMute) {
            const utterance = new SpeechSynthesisUtterance(text);
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
        const storedMessages = JSON.parse(localStorage.getItem('messagesEthan'));
        if (storedMessages) {
            setMessages(storedMessages);
        } else {
            const defaultMessage = "Hi! I'm Ethan, your Code Review Expert. Have bugs? Share your code, I'll give feedback to boost your skills!";
            setMessages([{ text: defaultMessage, from: 'bot' }]);
            handleSpeech(defaultMessage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('messagesEthan', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        const handleDeleteConversation = () => {
            const defaultMessage = "Hi! I'm Ethan, your Code Review Expert. Have bugs? Share your code, I'll give feedback to boost your skills!";
            setMessages([{ text: defaultMessage, from: 'bot' }]);
            setConversationHistory([]);
        };

        window.addEventListener('deleteConversationEthan', handleDeleteConversation);

        return () => {
            window.removeEventListener('deleteConversationEthan', handleDeleteConversation);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleEntercode = () => {
        openPopup();
    }

    return (
        <div className="relative mt-4 mr-4 border h-85p pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
            <div className="flex flex-col h-90p overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex justify-${message.from === 'user' ? 'end' : 'start'} mr-4`}>
                        <div className={`bg-${message.from === 'user' ? 'gray-200' : 'purple-100'} text-twilight-500 p-2 rounded-xl m-2 
                            w-${selectedLanguage && enteredCode && message.from === 'user' ? '3/4' : 'auto'}
                        `}>
                            <div className=" flex items-center text-sm font-semibold">{message.from === 'user' ? 'You' : 'Ethan'}</div>
                            <div className=" flex items-column">
                                {message.from === 'bot' && <Bot size={20} className="mr-2" />}
                                {message.from === 'user' && <User size={20} className="mr-2" />}
                                {message.text}
                            </div>
                            <div className="flex items-center justify-center mt-2 ml-2 mr-2">
                                {
                                    selectedLanguage && enteredCode && message.from === 'user' && (
                                        
                                         <SyntaxHighlighter language={selectedLanguage} style={docco} wrapLines={true}>
                                            {enteredCode}
                                        </SyntaxHighlighter>
                                     )
                                }
                            </div>
                        </div>
                    </div>
                ))}
                   {isThinking && (
                    <div className="flex justify-start mr-4 transition-colors duration-500">
                        <div className="bg-purple-100 text-twilight-500 p-2 rounded-xl m-2">
                            <div className="text-sm font-semibold">Ethan</div>
                            <div className="flex items-center justify-center">
                                <Bot size={20} className="mr-2" />
                                <div className="animate-pulse">Ethan is thinking...</div>
                            </div>
                        </div>
                    </div>
                )}
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
                    <button onClick={handleEntercode} title='Enter the code'>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-twilight-300 text-white ml-2">
                            <Code size={24} />
                        </div>
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="flex-grow bg-white rounded-xl p-2 ml-2 outline-none"
                    />
                    <button onClick={() => sendMessage(inputText)} title='Send message'>
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-twilight-300 text-white ml-2 mr-2">
                            <Send size={24} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

EthanChat.propTypes = {
    openPopup: PropTypes.func.isRequired,
    selectedLanguage: PropTypes.string,
    enteredCode: PropTypes.string
};

export default EthanChat;
