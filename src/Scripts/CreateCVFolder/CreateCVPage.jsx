import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import { FileText } from 'lucide-react';
import Form from './components/Form';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

function CreateCVPage() {
  const [cvData, setCVData] = useState(null);

  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Create CV', link: null },
  ];

  useEffect(() => {
    fetchCVData();
  }, []);

  const fetchCVData = () => {
    const token = localStorage.getItem('authToken');


    fetch('http://localhost:5000/get_cv_data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 404) {
        console.log('No CV data found');
      } else {
        setCVData(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };



  return (
    <div className="flex">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="w-5/6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4 mr-4">
          <div className="flex items-center bg-gradient-to-r from-twilight-100 to-purple-100 px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4">
            <FileText size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-lg font-semibold">
              {cvData ? 
                'Need to update your CV? No problem! You can do it right here.' : 
                'Don\'t have a CV yet? No problem! You can create it right here.'}
            </h3>
          </div>
          { cvData && (
          <Form cvData  = {cvData}
          />
          )}
           
        
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateCVPage;
