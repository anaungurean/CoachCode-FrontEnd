import  { useState, useEffect } from 'react';
import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import PostQuestionCard from './components/PostQuestionCard';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';
import Popup from './components/PopUp';
import { ToastContainer } from 'react-toastify';

function Community() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 10;
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [expandedImageUrl, setExpandedImageUrl] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        const token = localStorage.getItem('authToken');
        fetch('http://localhost:5000/questions', { // Fixed the fetch function here
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setPosts(data);
            setTotalPages(Math.ceil(data.length / postsPerPage));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Community', link: null },
    ];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const toggleImageSize = (imageUrl) => {
        setIsImageExpanded(!isImageExpanded);
        setExpandedImageUrl(imageUrl);
    };

    return (
        <div className="flex mr-4 mb-4">
            <div className="w-1/6"> 
                <NavBar />
            </div>

            <div className="w-5/6">
                <Breadcrumb items={breadcrumbItems} />
                <PostQuestionCard />
                <div className="mt-4">
                    {posts.map((post, index) => (
                        <PostCard 
                            key={index} 
                            post={post} 
                            isImageExpanded={isImageExpanded} 
                            toggleImageSize={() => toggleImageSize(`http://localhost:5000/questions_photo/${post.id}`)} 
                        />
                    ))}
                </div>
                
                <div className="mt-4">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>

            {isImageExpanded && (
                <Popup imageURL={expandedImageUrl} toggleImageSize={() => toggleImageSize('')} />
            )}
            <ToastContainer />
        </div> 
    );
}

export default Community;
