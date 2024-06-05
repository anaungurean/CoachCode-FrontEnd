import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import PostCard from './components/PostCard';
import DeletePostPopup from './components/DeletePostPopup';
import EditPostPopup from './components/EditPostPopup';
import DeleteCommentPopup from './components/DeleteCommentPopup';
import Popup from './components/PopUp';

function PostPage() {
    const breadcrumbItems = [
        {
            name: 'Home',
            link: '/home',
        },
        {
            name: 'Community',
            link: '/community',
        },
        {
            name: 'Post',
            link: '/',
        },
    ];

    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [expandedImageUrl, setExpandedImageUrl] = useState('');
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [post, setPost] = useState({});
    const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);
    const idPost = useParams().idPost;

    const toggleImageSize = (imageUrl) => {
        setIsImageExpanded(!isImageExpanded);
        setExpandedImageUrl(imageUrl);
    };

    useEffect(() => {
        fetchPost();
        makeSeenPost();
    }, []);


    const fetchPost = () => {
        console.log('Id:', idPost)
        const token = localStorage.getItem('authToken');
        fetch(`http://localhost:5000/questions/${idPost}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data);
            setPost(data[0]);
            console.log('Post:', post);
          
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const makeSeenPost = () => {
        const token = localStorage.getItem('authToken');
        const idNotification = localStorage.getItem('notification.id');
        console.log('Idfff:', idNotification)
        fetch(`http://localhost:5000/seen_notification/${idPost}/${idNotification}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  
          })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    return (
        <div className="flex">
            <div className="w-1/6">
                <NavBar />
            </div>
            <div className="w-5/6">
                <Breadcrumb items={breadcrumbItems} />
                { post.id && (
                    <div className="mt-4 mr-4">
                        <PostCard
                            post={post}
                            isImageExpanded={isImageExpanded}
                            toggleImageSize={() => toggleImageSize(`http://localhost:5000/questions_photo/${post.id}`)}
                            setShowDeletePopup={() => setShowDeletePopup(true)}
                            setShowEditPopup={() => setShowEditPopup(true)}
                            setShowDeleteCommentPopup={() => setShowDeleteCommentPopup(true)}
                        />

                        {isImageExpanded && (
                            <Popup imageURL={expandedImageUrl} toggleImageSize={() => toggleImageSize('')} />
                        )}
                        {showDeletePopup && (
                            <DeletePostPopup
                                togglePopup={setShowDeletePopup}
                                postId={idPost}
                            />
                        )}
                        {showEditPopup && (
                            <EditPostPopup
                                togglePopup={setShowEditPopup}
                                post={idPost}
                            />
                        )}
                        {showDeleteCommentPopup && (
                            <DeleteCommentPopup
                                togglePopup={setShowDeleteCommentPopup}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostPage;
