import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { Search } from 'lucide-react';
import FilterJob from './components/FilterJob';

function SearchJobPage() {

    const breadcrumbItems = [
        { name: 'Home', link: '/' },
        { name: 'Search Jobs', link:null },
      ];

    return (
        <div className="flex">
        <div className="w-1/6"> 
            <NavBar/>
        </div>
        <div className='w-5/6'>
        
            <Breadcrumb items={breadcrumbItems} />


        <div className="mt-4 mr-2">
            <div className="flex items-center bg-gradient-to-r from-twilight-100 to-purple-100  px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4" >
                <Search size={20} className="text-twilight-500 mr-2"/>
                <h3 className="text-lg font-semibold">Search jobs based on your preferences </h3>
            </div>

            <FilterJob/>
            
        </div>

        


        </div>
        </div>
    );
    }

export default SearchJobPage;