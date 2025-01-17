import { useState, useEffect } from 'react';
import { Home, ChevronRight, LogOut, User, ChevronDown, ChevronUp, Bell, BellDot, ThumbsUp, MessageCircle, Volume2, Volume, Trash } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';
import PropTypes from 'prop-types';

const Breadcrumb = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstName, ] = useState(localStorage.getItem('firstName'));
  const userId = localStorage.getItem('userId');
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const currentPath = window.location.pathname;
  const [isMute, setIsMute] = useState(localStorage.getItem('isMute') === 'true');
  const botName = localStorage.getItem('botName');

  useEffect(() => {
     const interval = setInterval(fetchNotifications, 5000);
     return () => clearInterval(interval);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.clear();
    window.location.href = 'http://localhost:5173';
  };

  const handleProfile = () => {
    setIsMenuOpen(false);
    window.location.href = 'http://localhost:5173/my-profile';
  };

  const fetchNotifications = () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/notifications/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setNotifications(data); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const calculateTimeAgo = (date) => {
    let postingDate = new Date(date);
    return formatDistanceToNowStrict(postingDate, { addSuffix: true });
  };

  const handleNotificationClick = (notification) => {
    window.location.href = `http://localhost:5173/post/${notification.question_id}`;
    localStorage.setItem('notification.id', notification.id);
  }

  const handleSoundClick = () => {
    const newIsMute = !isMute;
    setIsMute(newIsMute);
    localStorage.setItem('isMute', newIsMute.toString());
    console.log(newIsMute);
  }

 const handleDeleteConversation = () => {
    if (botName === 'Ethan') {
      localStorage.removeItem('messagesEthan');
      const defaultMessage = "Hi! I'm Ethan, your Code Review Expert. Have bugs? Share your code, I'll give feedback to boost your skills!";
      localStorage.setItem('messagesEthan', JSON.stringify([{ text: defaultMessage, from: 'bot' }]));

      // Dispatch custom event
      const event = new Event('deleteConversationEthan');
      window.dispatchEvent(event);
    }

    if (botName === 'Ava') {
      localStorage.removeItem('messagesAva');
      const defaultMessage = "Hi! I'm Ava, your friendly Job Search Advisor. Need a friend to ask for advice on crafting your CV, acing interviews, or navigating job offers? I'm here to help!";
      localStorage.setItem('messagesAva', JSON.stringify([{ text: defaultMessage, from: 'bot' }]));

      // Dispatch custom event
      const event = new Event('deleteConversationAva');
      window.dispatchEvent(event);
    }

    if (botName === 'Mia') {
      localStorage.removeItem('messagesMia');
      const defaultMessage = "Hi! I'm Mia, HR Interview! Are you ready to take a mock HR interview? Please type 'Yes' or 'No' to start.";
      localStorage.setItem('messagesMia', JSON.stringify([{ text: defaultMessage, from: 'bot' }]));

      const event = new Event('deleteConversationMia');
      window.dispatchEvent(event);
    }

    if (botName === 'Lucas') {
      localStorage.removeItem('messagesLucas');
      const defaultMessage = "Hi! I'm Lucas, your Technical Interviewer. Are you ready to take a mock technical interview? Please type 'Yes' or 'No' to start.";
      localStorage.setItem('messagesLucas', JSON.stringify([{ text: defaultMessage, from: 'bot' }]));

      const event = new Event('deleteConversationLucas');
      window.dispatchEvent(event);
  }

    if (botName === 'Ana') {
      localStorage.removeItem('messagesAna');
      const defaultMessage = "Hi! I'm Ana. Have questions about CoachCode? I'm here to help!";
      localStorage.setItem('messagesAna', JSON.stringify([{ text: defaultMessage, from: 'bot' }]));

      const event = new Event('deleteConversationAna');
      window.dispatchEvent(event);
    }

}

  return (
    <nav className="flex flex-wrap justify-between items-center px-5 py-4 mt-4 mr-2 text-twilight-400 border border-gray-200 rounded-xl bg-white" aria-label="Breadcrumb">
  <ol className="flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    {items.map((item, index) => (
      <li key={index} className="inline-flex items-center">
        {item.link ? (
          <a href={item.link} className="inline-flex items-center font-medium text-twilight-300 hover:text-twilight-500">
            {index === 0 && (
              <Home className="w-4 h-4 me-2.5" />
            )}
            {item.name}
          </a>
        ) : (
          <span className="inline-flex items-center font-medium text-twilight-300">
            {item.name}
          </span>
        )}
        {index < items.length - 1 && (
          <ChevronRight className="rtl:rotate-180 block w-4 h-4 mx-1 text-twilight-300" />
        )}
      </li>
    ))}
  </ol>

  <div className="flex items-center space-x-2 relative z-50">
    {(currentPath.includes('voice-chat-bot') || currentPath.includes('help')) && (
      <button className="bg-purple-100 p-2 rounded-full text-twilight-500 hover:bg-purple-200 focus:outline-none"
        onClick={handleSoundClick}>
        <div className="flex items-center">
          {isMute ? <Volume size={20} /> : <Volume2 size={20} />}
          <p className="hidden sm:block text-base text-twilight-400 ml-1">
            {isMute ? `Unmute ${botName}` : `Mute ${botName}`}
          </p>
        </div>
      </button>
    )}

    {(currentPath.includes('voice-chat-bot') || currentPath.includes('help')) && (
      <button className="bg-purple-100 p-2 rounded-full text-twilight-500 hover:bg-purple-200 focus:outline-none"
        onClick={handleDeleteConversation}>
        <div className="flex items-center">
          <Trash size={20} />
          <p className="hidden sm:block text-base text-twilight-400 ml-1">Delete Conversation</p>
        </div>
      </button>
    )}

    <div className="flex items-center">
      <button 
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className="rounded-full bg-purple-100 p-2 text-twilight-500 hover:text-twilight-600 focus:outline-none">
        {notifications.length > 0 ? <BellDot size={20} /> : <Bell size={20} />}
      </button>
      {isNotificationsOpen && (
        <div className="absolute top-full right-20 bg-purple-50 shadow-md rounded-md w-72 z-100">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-row w-full py-2 px-4 text-sm text-twilight-400 hover:bg-twilight-100/10 focus:outline-none" onClick={() => handleNotificationClick(notification)}>
              <div className="flex flex-col">
                <div className="flex items-center">
                  {notification.notification_type === 'like' && <ThumbsUp size={16} className="mr-2" />}
                  {notification.notification_type === 'comment' && <MessageCircle size={16} className="mr-2" />}
                  <p className="text-sm font-medium text-twilight-400 mr-2">
                    {notification.notification_type === 'like' && 'New like'}
                    {notification.notification_type === 'comment' && 'New comment'}
                    {notification.notification_type !== 'like' && notification.notification_type !== 'comment' && 'New follow'}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {calculateTimeAgo(notification.created_at)}
                </p>
                <p className="text-xs text-twilight-400">
                  {notification.user_name_that_triggered} {notification.notification_type === 'like' && 'liked'} {notification.notification_type === 'comment' && 'commented on'} {notification.notification_type !== 'like' && notification.notification_type !== 'comment' && 'followed'} your post
                </p>
              </div>
              {notifications.length > 1 && index < notifications.length - 1 && <hr className="w-full border-t border-gray-200" />}
            </div>
          ))}
        </div>
      )}
    </div>

    <a href="http://localhost:5173/my-profile">
      <img src={`http://localhost:5000/user_photo/${userId}`} className="w-9 h-9 rounded-full" alt="User" />
    </a>
    <p className="hidden sm:block text-lg font-medium text-twilight-300">{firstName}</p>
    <button onClick={handleMenuClick}>
      {isMenuOpen ? <ChevronUp size={20} className="text-twilight-500" /> : <ChevronDown size={20} className="text-twilight-500" />}
    </button>
    {isMenuOpen && (
      <div className="absolute top-full right-0 bg-purple-50 shadow-md rounded-md">
        <button className="flex items-center w-full py-2 px-4 text-sm text-twilight-400 hover:bg-twilight-100/10 focus:outline-none" onClick={handleProfile}>
          <User size={16} className="mr-2" /> Profile
        </button>
        <button className="flex items-center w-full py-2 px-4 text-sm text-twilight-400 hover:bg-twilight-100/10 focus:outline-none" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" /> LogOut
        </button>
      </div>
    )}
  </div>
</nav>

  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
  })).isRequired,
};

export default Breadcrumb;
