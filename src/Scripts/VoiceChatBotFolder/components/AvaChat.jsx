import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, User } from 'lucide-react';
  

const AvaChat = () => {
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
        const userMessage = {
            text: message,
            from: 'user',
        };
        setMessages([...messages, userMessage]);

        setInputText('');
        setIsThinking(true);
        let messageToSend = message;
 
        fetch('http://localhost:5000/chatAva', {
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
                const botMessageObject = {
                    text: botMessage,
                    from: 'bot',
                    code: '',
                    language: '',
                };
                setMessages(prevMessages => [...prevMessages, botMessageObject]);
                handleSpeech(botMessage);
 
            })
            .catch(error => {
                console.error('Error:', error);
                setIsThinking(false);
            });
    };

    const handleSpeech = (text) => {
        let isMute = localStorage.getItem('isMute') === 'true';
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
        const storedMessages = JSON.parse(localStorage.getItem('messagesAva'));
        if (storedMessages) {
            setMessages(storedMessages);
        } else {
            const defaultMessage = "Hi! I'm Ava, your friendly Job Search Advisor. Need a friend to ask for advice on crafting your CV, acing interviews, or navigating job offers? I'm here to help!";
            setMessages([{ text: defaultMessage, from: 'bot' }]);
            handleSpeech(defaultMessage);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('messagesAva', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        const handleDeleteConversation = () => {
            const defaultMessage = "Hi! I'm Ava, your friendly Job Search Advisor. Need a friend to ask for advice on crafting your CV, acing interviews, or navigating job offers? I'm here to help!";
            setMessages([{ text: defaultMessage, from: 'bot'}]);
            setConversationHistory(messages.map(message => message.text));
        };

        window.addEventListener('deleteConversationAva', handleDeleteConversation);

        return () => {
            window.removeEventListener('deleteConversationAva', handleDeleteConversation);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

 
 
const renderBotMessage = (text) => {
    const semiboldRegex = /(`[^`]+`|"[^"]+"|\*\*[^*]+\*\*)/g;
    const enumerationRegex = /(\d+)\.\s/g;
    let match;
    let lastIndex = 0;
    const processedText = [];

    // First, handle semibold formatting
    while ((match = semiboldRegex.exec(text)) !== null) {
        const beforeSemibold = text.substring(lastIndex, match.index);
        const semiboldContent = match[0]; // Matched content including ` or "

        if (beforeSemibold) {
            processedText.push(beforeSemibold);
        }

        // Remove the surrounding ` or "
        const cleanedSemiboldContent = semiboldContent.slice(1, -1);

        processedText.push(
            <strong key={processedText.length} style={{ fontWeight: '600' }}>
                {cleanedSemiboldContent}
            </strong>
        );

        lastIndex = semiboldRegex.lastIndex;
    }

    // Handle remaining text for semibold formatting
    const remainingText = text.substring(lastIndex);
    let lastIndexInner = 0;
    let innerMatch;

    // Process the enumeration
    while ((innerMatch = enumerationRegex.exec(remainingText)) !== null) {
        const beforeEnumeration = remainingText.substring(lastIndexInner, innerMatch.index);
        const enumerationContent = innerMatch[0]; // Matched enumeration

        if (beforeEnumeration) {
            processedText.push(beforeEnumeration);
        }

        processedText.push(
            <br key={processedText.length} />,
            <strong key={processedText.length} style={{ fontWeight: '600' }}>
                {enumerationContent}
            </strong>
        );

        lastIndexInner = enumerationRegex.lastIndex;
    }

    processedText.push(remainingText.substring(lastIndexInner));

    return processedText;
};


    return (
        <div className="relative mt-4 mr-4 border h-85p pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
            <div className="flex flex-col h-90p overflow-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex justify-${message.from === 'user' ? 'end' : 'start'} mr-4`}>
                        <div className={`bg-${message.from === 'user' ? 'gray-200' : 'purple-100'} text-twilight-500 p-2 rounded-xl m-2 
                            w-${message.language && message.code && message.from === 'user' ? '5/6' : 'auto'}
                        `}>
                            <div className="flex items-center text-sm font-semibold">{message.from === 'user' ? 'You' : 'Ava'}</div>
                            <div className="flex items-column">
                                {message.from === 'bot' && <Bot size={20} className="mr-2" />}
                                {message.from === 'user' && <User size={20} className="mr-2" />}
                                {message.from === 'user' && <div>{message.text}</div>}
                            </div>
                            <div>
                                {message.from === 'bot' && message.text &&
                                    renderBotMessage(message.text)}
                            </div>
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex justify-start mr-4 transition-colors duration-500">
                        <div className="bg-purple-100 text-twilight-500 p-2 rounded-xl m-2">
                            <div className="text-sm font-semibold">Ava</div>
                            <div className="flex items-center justify-center">
                                <Bot size={20} className="mr-2" />
                                <div className="animate-pulse">Ava is thinking...</div>
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

 
export default AvaChat;
