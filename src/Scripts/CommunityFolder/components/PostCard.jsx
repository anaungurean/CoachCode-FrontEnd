import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';
import { Menu, Edit, Trash } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

function PostCard({ post, toggleImageSize, setShowDeletePopup, setPostId, setShowEditPopup}) {
      const calculateTimeAgo = (date) => {
        let postingDate = new Date(date);
        return formatDistanceToNowStrict(postingDate, { addSuffix: true});

    };
    
    const timeAgo = calculateTimeAgo(post.posting_date);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);
    const [isExpanded, setIsExpanded] = useState(false);
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  
    useEffect(() => {
        checkIfLiked();
        fetchLikes();
        fetchComments();
    }, []);

    const handleLike = () => {
        setIsLiked(true);
        fetch(`http://localhost:5000/questions/${post.id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            fetchLikes();
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleUnlike = () => {
        setIsLiked(false);
        fetch(`http://localhost:5000/questions/${post.id}/like`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            fetchLikes();
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const fetchLikes = () => {
        fetch(`http://localhost:5000/questions/${post.id}/likes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setLikes(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const checkIfLiked = () => {
        fetch(`http://localhost:5000/questions/${post.id}/is_liked`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setIsLiked(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const fetchComments = () => {
        fetch(`http://localhost:5000/questions/${post.id}/answers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setComments(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment) {
            return;
        }
        fetch(`http://localhost:5000/questions/${post.id}/answers`, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content: newComment })  
        })
        .then(response => response.json())
        .then(data => {
            setNewComment('');
            fetchComments();
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleShowMoreComments = () => {
        setVisibleCommentsCount(prevCount => prevCount + 5);
        setIsExpanded(true);
    };

    const handleShowLessComments = () => {
        setVisibleCommentsCount(5);
        setIsExpanded(false);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEdit = () => {
        setIsExpanded(false);
        setPostId(post.id);
        setShowEditPopup(true);
    };

    const handleDelete = () => {
        setIsExpanded(false);
        setPostId(post.id);
        setShowDeletePopup(true);
    }
    return (
        <div className="mt-4 mr-3 border  pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md z-10">
            <div className="flex items-center">
            
                <div className="flex-shrink-0">
                    <img src={`http://localhost:5000/user_photo/${post.user_id}`} className="w-10 h-10 rounded-full" alt="User" />
                </div>
                <div className="ml-4">
                    <p className="text-base font-bold text-twilight-500">{post.first_name} {post.last_name}</p>
                    <p className="text-sm text-gray-600">{timeAgo}</p>
                    {post.topic && (
                        post.topic.split(',').map((topic, index) => (
                            <span key={index} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 mr-2 mt-2 text-sm font-medium text-purple-700  ring-1 ring-inset border-dotted ring-purple-200 hover:ring-2 shadow-sm">{topic}</span>
                        ))
                    )}
                </div>
            {post.user_id === userId && (
    <div className="ml-auto mr-4">
        <div className="relative">
            <button className="text-sm rounded-full bg-purple-50 text-gray-600 p-1 ring-1 ring-inset ring-twilight-200 hover:text-twilight-500 focus:outline-none" onClick={handleMenuClick}>
                <Menu size={18} color={'#56437c'}/>
            </button>
             {isMenuOpen && (
                <div className="absolute top-8 right-0 bg-white shadow-md rounded-md">
                    <button className="flex items-center  w-full py-2 px-4 text-sm text-twilight-400 hover:bg-purple-50 focus:outline-none" onClick={handleEdit}>
                        <Edit size={16} className="mr-2" /> Edit
                    </button>
                    <button className="flex items-center w-full py-2 px-4 text-sm text-twilight-400 hover:bg-purple-50 focus:outline-none"
                         onClick={handleDelete}>
                        <Trash size={16} className="mr-2" /> Delete
                    </button>
                </div>
            )}
        </div>
    </div>
)}
                 
            </div>
            
            <div className="mt-2 mr-4 border border-twilight-200 rounded-md p-2 mb-2 bg-purple-50 focus:outline-none bg-opacity-80 ">
                <h2 className="text-lg font-semibold text-twilight-400">{post.title}</h2>
                <p className="mt-1 text-twilight-400">{post.content}</p>
                {post.photo && (
                    <div className="mt-2 flex justify-center">
                        <img
                            src={`http://localhost:5000/questions_photo/${post.id}`}
                            className="object-fill rounded-lg cursor-pointer w-100 h-96"
                            alt="Post"
                            onClick={toggleImageSize}
                        />
                    </div>
                )}
            </div>
            <div className="mt-2 flex ">
                <button
                    className={`text-sm text-gray-600 hover:text-twilight-500 focus:outline-none ${isLiked ? 'text-red-500' : ''}`}
                    onClick={isLiked ? handleUnlike : handleLike}
                >
                    {isLiked ? <BiSolidLike size={22} color={'#56437c'}/> : <BiLike size={22} color={'#56437c'}/>}
                </button>
                <p className="text-sm text-twilight-500 ml-1">{likes} Likes</p>

                <button className="text-sm text-gray-600 hover:text-twilight-500 focus:outline-none ml-4">
                    <FaComments size={22} color={'#56437c'}/>
                </button>
                <p className="text-sm text-twilight-500 ml-1">{comments.length} Comments</p>
            </div>
            
            <div className="mt-4 mr-4 pl-4 pt-2 pb-2 border border-twilight-200 rounded-md p-2 bg-purple-50 bg-opacity-80   ">
                <div className="flex items-center">
                    <h3 className="text-base font-semibold text-twilight-400">Comments</h3>
                    <button className="ml-auto mr-4 text-sm text-gray-600 hover:text-twilight-500 focus:outline-none" onClick={() => setShowComments(!showComments)}>
                        {showComments ? <ChevronUp size={22} color={'#56437c'}/> : <ChevronDown size={22} color={'#56437c'}/>}
                    </button>
                </div>
                {showComments && (
                    <>
                        {comments.slice(0, visibleCommentsCount).map(comment => (
                            <div key={comment.id} className="mt-2 mr-4  rounded-md bg-twilight-100/10">
                                <div className="flex items-center">
                                    <div className="flex ml-2">
                                        <img src={`http://localhost:5000/user_photo/${comment.user_id}`} className="w-10 h-10 rounded-full" alt="User" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-base font-bold text-twilight-500">{comment.first_name} {comment.last_name}</p>
                                        <p className="text-sm text-twilight-500">{calculateTimeAgo(comment.posting_date)}</p>
                                        <div className="">
                                            <p className="text-base text-twilight-500">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {visibleCommentsCount < comments.length && !isExpanded && (
                            <button className="mt-2 text-sm font-medium text-twilight-500 hover:text-twilight-700 focus:outline-none" onClick={handleShowMoreComments}>
                                Show more
                            </button>
                        )}
                        {isExpanded && (
                            <button className="mt-2 text-sm font-medium text-twilight-500 hover:text-twilight-700 focus:outline-none" onClick={handleShowLessComments}>
                                Show less
                            </button>
                        )}
                        <div className="mt-2 mr-4 flex items-center">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full h-10 pl-10 pr-10 border border-twilight-200 rounded-md p-2 mb-2 bg-twilight-100/10 focus:outline-none text-twilight-300"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <Send
                                    size={28}
                                    color={'#56437c'}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pb-2"
                                    onClick={handleAddComment}
                                />
                            </div>
                        </div>
                    
                    </>
                )}
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        posting_date: PropTypes.string.isRequired,
        photo: PropTypes.string,
        topic: PropTypes.string.isRequired,
    }).isRequired,
    toggleImageSize: PropTypes.func.isRequired,
    setShowDeletePopup: PropTypes.func.isRequired,
    setPostId: PropTypes.func.isRequired,
    setShowEditPopup: PropTypes.func.isRequired,
};

export default PostCard;
