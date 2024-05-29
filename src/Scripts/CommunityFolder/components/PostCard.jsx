import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { ChevronDown, ChevronUp } from 'lucide-react';


function PostCard({ post, toggleImageSize }) {
    const timeAgo = formatDistanceToNowStrict(new Date(post.posting_date), { addSuffix: true });
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    
    const token = localStorage.getItem('authToken');

    const calculateTimeAgo = (date) => {
        return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    };

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

    return (
        <div className="mt-4 mr-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img src={`http://localhost:5000/user_photo/${post.user_id}`} className="w-10 h-10 rounded-full" alt="User" />
                </div>
                <div className="ml-4">
                    <p className="text-base font-bold text-twilight-500">{post.first_name} {post.last_name}</p>
                    <p className="text-sm text-gray-600">{timeAgo}</p>
                </div>
            </div>
            <div className="mt-2">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="mt-1 text-gray-600">{post.content}</p>
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
            
            
             <div className="mt-4 mr-4 border pl-4 pt-2 pb-2 border border-twilight-100 rounded-md p-2 bg-purple-50 bg-opacity-80 shadow-md backdrop-blur-md  ">
            <div className="flex items-center">
                <h3 className="text-base font-semibold">Comments</h3>
                <button className="ml-auto mr-4 text-sm text-gray-600 hover:text-twilight-500 focus:outline-none" onClick={() => setShowComments(!showComments)}>
                    {showComments ? <ChevronUp size={22} color={'#56437c'}/> : <ChevronDown size={22} color={'#56437c'}/>}
                </button>
            </div>
            {showComments && (
                comments.map(comment => (
                    <div key={comment.id} className=" mt-2 mr-4 border-gray-300 rounded-lg bg-twilight-100/10 ">

                        <div className="flex items-center">
                        <div className="flex ml-2 ">
                            <img src={`http://localhost:5000/user_photo/${comment.user_id}`} className="w-10 h-10 rounded-full" alt="User" />
                        </div>
                        <div className="ml-4">
                            <p className="text-base font-bold text-twilight-500">{comment.first_name} {comment.last_name} </p>
                            <p className="text-sm text-twilight-500">{calculateTimeAgo(comment.posting_date)}</p>
                            <div className="">
                                <p className="text-base text-twilight-500 ">{comment.content}</p>
                            </div>
                        </div>
                        </div>
                         
                    </div>
                ))
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
    }).isRequired,
    toggleImageSize: PropTypes.func.isRequired,
};

export default PostCard;
