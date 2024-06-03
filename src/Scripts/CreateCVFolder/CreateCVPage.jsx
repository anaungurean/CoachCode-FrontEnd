import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import {FileText} from 'lucide-react';
import Form from './components/Form';
import { ToastContainer } from 'react-toastify';

function CreateCVPage() {

   const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Create CV', link:null },
  ];



  return (
    <div className="flex">
      <div className="w-1/6"> 
        <NavBar/>
      </div>
      <div className='w-5/6'>
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 mr-4">
              <div className="flex items-center bg-gradient-to-r from-twilight-100 to-purple-100  px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4" >
                <FileText size={20} className="text-twilight-500 mr-2"/>
                    <h3 className="text-lg font-semibold">Don&apos;t have a CV yet? No problem! You can create it right here.</h3>
            </div>
        
         <Form />
        </div>
    </div>
    <ToastContainer />
    </div>
  );
}


export default CreateCVPage;
