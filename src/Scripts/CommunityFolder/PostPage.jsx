import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import PostCard from './components/PostCard';
import { useState } from 'react';
import DeletePostPopup from './components/DeletePostPopup';
import EditPostPopup from './components/EditPostPopup';
import DeleteCommentPopup from './components/DeleteCommentPopup';
import Popup from './components/PopUp';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
 

function PostPage() {
    const breadcrumbItems = [
    {
      name: 'Home',
      link: '/home',
    },
    {
      name: 'Community Folder',
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
    const [, setPostId] = useState(null);
    const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);
    const [post, setPost] = useState({});
    const { postId } = useParams();
    console.log(postId);

    const toggleImageSize = (imageUrl) => {
        setIsImageExpanded(!isImageExpanded);
        setExpandedImageUrl(imageUrl);
    };

    useEffect(() => {
        fetchPost();
    }
    ,[]);

    const fetchPost = () => {
        const token = localStorage.getItem('authToken');
        fetch('http://localhost:5000/questions/' + postId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data); // aici nu se afiseaza nimic in consola
            setPost(data);
            
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
        { post && ( 
        <div className="mt-4 mr-4">
             <PostCard 
                            post={post} 
                            isImageExpanded={isImageExpanded} 
                            toggleImageSize={() => toggleImageSize(`http://localhost:5000/questions_photo/${post.id}`)}
                            setShowDeletePopup={() => setShowDeletePopup(true)}
                            setShowEditPopup={() => setShowEditPopup(true)}
                            setPostId={() => setPostId(postId)}
                            setShowDeleteCommentPopup={() => setShowDeleteCommentPopup(true)}
                />   

             {isImageExpanded && (
                <Popup imageURL={expandedImageUrl} toggleImageSize={() => toggleImageSize('')} />
            )}
            { 
                        showDeletePopup && (
                            <DeletePostPopup
                                togglePopup={setShowDeletePopup}
                                postId= {postId}
                            />
                            
                        )
                        
            }

            { 
                        showEditPopup && (
                            <EditPostPopup
                                togglePopup={setShowEditPopup}
                                post = {postId}
                            />
                            
                        )
                        
            }

            {
                showDeleteCommentPopup && (
                    <DeleteCommentPopup
                        togglePopup={setShowDeleteCommentPopup}
                    />
                )
            }   
        </div>
        )}

      </div>
     </div>
  );
}

export default PostPage;
