/* eslint-disable react/prop-types */

import  { useState, useEffect } from 'react';
import { Home, ChevronRight, LogOut, User, ChevronDown, ChevronUp, Bell, BellDot, ThumbsUp,MessageCircle   } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns'

const Breadcrumb = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstName, ] = useState(localStorage.getItem('firstName'));
  const userId = localStorage.getItem('userId');
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
        return formatDistanceToNowStrict(postingDate, { addSuffix: true});

    };

  const handleNotificationClick = (notification) => {
    window.location.href = `http://localhost:5173/post/${notification.question_id}`;
    localStorage.setItem('notification.id', notification.id);
  }

  return (
    <nav className="flex justify-between items-center px-5 py-4 mt-4 mr-2 text-twilight-400 border border-gray-200 rounded-xl bg-white" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
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
       <div className="flex items-center  ">
        <button 
    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
    className="rounded-full bg-purple-100 p-2 text-twilight-500 hover:text-twilight-600 focus:outline-none">
    {notifications.length > 0 ? <BellDot size={20} /> : <Bell size={20} />}
  </button>
      {isNotificationsOpen && (
        <div className="absolute top-full right-20 bg-purple-50 shadow-md rounded-md w-72 z-100">
          {notifications.map((notification, index) => (
          <div key={index} className="flex items-row w-full py-2 px-4 text-sm text-twilight-400 hover:bg-twilight-100/10 focus:outline-none" onClick={() => handleNotificationClick(notification)}>
              <div className="flex flex-col ">
              <div className="flex items-center  ">
                {notification.notification_type === 'like' && <ThumbsUp  size={16} className="mr-2" />}
                {notification.notification_type === 'comment' && <MessageCircle  size={16} className="mr-2" />}
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
                  {notification.user_name_that_triggered } {notification.notification_type === 'like' && 'liked'} {notification.notification_type === 'comment' && 'commented on'} {notification.notification_type !== 'like' && notification.notification_type !== 'comment' && 'followed'} your post
                </p>
              </div>
              {
                notification.length > 1 && index < notification.length -1  && <hr className="w-full border-t border-gray-200" />
              }
            </div>
          ))}
        </div>
      )}

</div>






        <a href="http://localhost:5173/my-profile">
          <img src={`http://localhost:5000/user_photo/${userId}`} className="w-9 h-9 rounded-full" alt="User" />
        </a>
        <p className="text-lg font-medium text-twilight-300">{firstName}</p>
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

export default Breadcrumb;
