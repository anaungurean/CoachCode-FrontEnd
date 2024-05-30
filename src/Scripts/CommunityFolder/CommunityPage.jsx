import  { useState, useEffect } from 'react';
import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import PostQuestionCard from './components/PostQuestionCard';
import PostCard from './components/PostCard';
import Pagination from './components/Pagination';
import Popup from './components/PopUp';
import { ToastContainer } from 'react-toastify';
import { Search } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import DropdownSort from './components/DropdownSort';

function Community() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 10;
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [expandedImageUrl, setExpandedImageUrl] = useState('');
    const [searchedPosts, setSearchedPosts] = useState('');
    const [sortBy, setSortBy] = useState([]);

    const sortOptions = [
        { value: 'Newest', label: 'Newest' },
        { value: 'Oldest', label: 'Oldest' },
        { value: 'My Post', label: 'My Post' }
    ];

    const sortByOption = (option) => {
        let sortedPosts = [...posts]; 
        const token = localStorage.getItem('authToken');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        switch (option) {
            case 'Newest':
                sortedPosts = sortedPosts.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
                break;
            case 'Oldest':
                sortedPosts = sortedPosts.sort((a, b) => new Date(a.posting_date) - new Date(b.posting_date));
                break;
            case 'My Post':
                sortedPosts = sortedPosts.filter(post => post.user_id === userId);
                break;
            default:
                break;
        }

        setPosts(sortedPosts);  
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        filterPosts(); 
    }, [searchedPosts, posts]); 

    const handleSearchInputChange = (e) => {
        setSearchedPosts(e.target.value);
    };

    const fetchPosts = () => {
        const token = localStorage.getItem('authToken');
        fetch('http://localhost:5000/questions', {
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

    const filterPosts = () => {
        const filtered = posts.filter(post => {
            const searchQuery = searchedPosts.toLowerCase();
            const title = post.title.toLowerCase();
            const content = post.content.toLowerCase();
            const topics = post.topic.toLowerCase();
            return title.includes(searchQuery) || content.includes(searchQuery) || topics.includes(searchQuery);
        });
        setFilteredPosts(filtered);
        setTotalPages(Math.ceil(filtered.length / postsPerPage));  
    };

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
                <div className="z-100"> 
                    <PostQuestionCard />
                </div>

                <div className="mr-4 mt-2 flex items-center">
                    <div className="relative w-full mr-4 ">
                        <Search
                            size={22}
                            color={'#56437c'}
                            className="absolute top-2 left-2 z-10"
                        />
                        <input
                            type="text"
                            className="w-full h-10 pl-10 pr-10 border border-gray-100 rounded-md p-2 mb-2 bg-white shadow-md focus:outline-none text-twilight-300"
                            placeholder="Search for a post"
                            value={searchedPosts}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div className="">
                        <DropdownSort
                            title="Newest"
                            options={sortOptions}
                            selectedOptions={sortBy}
                            setSelectedOptions={setSortBy}
                            sortByOption={sortByOption}
                        />
                    </div>
                </div>
                <div className="mt-4 z-10 ">
                    {filteredPosts.map((post, index) => (  
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
