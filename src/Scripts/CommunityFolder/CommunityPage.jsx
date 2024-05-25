import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import PostQuestionCard from './components/PostQuestionCard';
 
function Community() {
    
    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Community', link: null },
    ];

    return (
        <div className="flex mr-4 mb-4">
            <div className="w-1/6"> 
                <NavBar />
            </div>

            <div className="w-5/6">
                <Breadcrumb items={breadcrumbItems} />

                <PostQuestionCard />


  
            </div>
        </div> 
    );
}

export default Community;
