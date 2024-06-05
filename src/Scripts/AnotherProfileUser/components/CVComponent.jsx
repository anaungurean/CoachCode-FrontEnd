import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  ChevronDown, ChevronUp } from 'lucide-react';
 
const CVComponent = ({ user }) => {
    const [pdfContent, setPdfContent] = useState(null);
    const [showCV, setShowCV] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [, setExistingCV] = useState(false);

    useEffect(() => {
        checkIfPublic();
    }, []);


    const checkIfPublic = () => {
        let user_id = user.id;
        const token = localStorage.getItem('authToken');
        try {
            fetch(`http://localhost:5000/is_public/${user_id}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            setIsPublic(data.is_public);
            if (data.is_public) {
                fetchCV();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        } catch (error) {
            console.error('Error:', error);

        }
    };


    const fetchCV = async () => {
        let user_id = user.id;
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:5000/get_cv/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 404) {
                setExistingCV(false);
                return;
            }
            setExistingCV(true);
            const blob = await response.blob();
            setPdfContent(blob);
        } catch (error) {
            console.error('Error:', error);
        }
    };

  

    return (
        <>
            {isPublic && (
                <div className="w-full mt-4 bg-white border shadow-sm rounded-2xl p-4">
                    <div className='text-center mb-4 flex justify-between items-center'>
                        <button
                            onClick={() => setShowCV(!showCV)}
                            className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
                        >
                            {showCV ? <ChevronUp size={18} className="text-twilight-500" /> : <ChevronDown size={18} className="text-twilight-500" />}
                        </button>
                        <div className='flex-grow'>
                            <h1 className='text-2xl font-bold text-twilight-400'>Curriculum Vitae</h1>
                        </div>
                    </div>

                    {showCV && (
                        <div>
                            <div className='gap-4'>
                                {pdfContent && (
                                    <embed
                                        src={URL.createObjectURL(pdfContent)}
                                        type="application/pdf"
                                        width="100%"
                                        height="800px"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

CVComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default CVComponent;
