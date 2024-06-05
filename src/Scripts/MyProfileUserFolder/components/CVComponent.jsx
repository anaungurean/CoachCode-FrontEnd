import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Edit, ChevronDown, ChevronUp, Lock, Unlock } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { Link, } from 'react-router-dom';

const CVComponent = ({ user }) => {
    const [pdfContent, setPdfContent] = useState(null);
    const [showCV, setShowCV] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [existingCV, setExistingCV] = useState(false);

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

    const toggleCVVisibility = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:5000/toggle_public', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to toggle CV visibility');
            }
          
            const data = await response.json();

            setIsPublic(data.public);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCV();
    }, []);

    useEffect(() => {
        setIsPublic(false); // Reset isPublic state when CV visibility changes
    }, [showCV]);

    useEffect(() => {
        const savedIsPublic = localStorage.getItem('isPublic');
        if (savedIsPublic !== null) {
            setIsPublic(savedIsPublic === 'true');
        }
    }, []);

    const toggleTheme = () => {
        setIsPublic(!isPublic);
        localStorage.setItem('isPublic', !isPublic);
        toggleCVVisibility();
    };

    return (
        <div className="p-4">
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
                {existingCV && (
                <div>
                    <Link to="http://localhost:5173/create-cv">
                        <button
                            className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
                        >
                            <Edit size={18} className="text-twilight-500" />
                        </button>
                    </Link>
                </div>
                )}
            </div>

            {showCV &&  existingCV && (
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
                   <div className='flex mt-4 items-end'>
                        <div className="flex justify-center">
                            <button
                                onClick={toggleTheme}
                                className={`w-20 h-8 rounded-full ${isPublic ? 'bg-twilight-100 text-white' : 'bg-twilight-300 text-black'} flex items-center justify-center transition duration-300 focus:outline-none shadow`}
                            >
                                <div
                                    className={`w-8 h-8 relative rounded-full transition duration-500 transform ${isPublic ? 'bg-twilight-300 translate-x-full' : 'bg-twilight-100 -translate-x-full'} text-white flex items-center justify-center`}
                                >
                                    {isPublic ? <Unlock size={18} /> : <Lock size={18} />}
                                </div>
                            </button>
                            <div className='ml-4 flex items-center'>
                                {isPublic ? (
                                    <p className='text-lg font-medium text-twilight-400'>Public CV</p>
                                ) : (
                                    <p className='text-lg font-medium text-twilight-400'>Private CV</p>
                                )}
                            </div>
                        </div>
                    </div>

                    </div>
            )}
            {showCV && !existingCV && (
                <div className='flex justify-center'>
                    <Link to="http://localhost:5173/create-cv">

                        <button
                            className="flex items-center gap-x-1.5 rounded-full bg-purple-50 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
                        >
                            <Edit size={18} className="text-twilight-500" />
                              It looks like you haven&apos;t created a CV yet. Click here to create one.
                        </button>
                    </Link>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

CVComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default CVComponent;
