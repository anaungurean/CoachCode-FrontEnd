import PropTypes from 'prop-types';
 


import { ToastContainer } from 'react-toastify';
const SocialAccountsComponent = ({ user}) => {
    
    
    return (
        <div className="p-4">
            <div className='text-center mb-4 flex justify-between items-center'>
            <div className='flex-grow'>
                <h1 className='text-2xl font-bold text-twilight-400'>Social Accounts </h1>
            </div>
        </div>
            <div className="grid gap-4">
                <div className="flex items-center  border-twilight-300 rounded bg-purple-50">
                    <img src='/src/assets/linkedin.png' alt='LinkedIn' className='w-8 h-8 mr-3 ml-2' />
                    <div className="flex-1 ">
                        <h1 className='text-lg text-twilight-500 font-semibold'>LinkedIn</h1>
                       
                            <a href={user.linkedin_url} target='_blank' rel='noreferrer' className='text-base font-medium text-twilight-400 hover:underline'>{user.linkedin_url ?? 'Not provided'}</a>
                      
                    </div>
                </div>
                <div className="flex items-center border-twilight-300 rounded bg-purple-50">
                    <img src='/src/assets/github.png' alt='GitHub' className='w-8 h-8 mr-3 ml-2' />
                    <div className="flex-1">
                        <h1 className='text-lg text-twilight-500 font-semibold'>GitHub</h1>
                       
                            <a href={user.github_url} target='_blank' rel='noreferrer' className='text-base font-medium text-twilight-400 hover:underline'>{user.github_url ?? 'Not provided'}</a>
                   
                    </div>
                </div>
                <div className="flex items-center border-twilight-300 rounded bg-purple-50">
                    <img src='/src/assets/facebook.png' alt='Facebook' className='w-8 h-8 mr-3 ml-2' />
                    <div className="flex-1">
                        <h1 className='text-lg text-twilight-500 font-semibold'>Facebook</h1>
                        
                            <a href={user.facebook_url} target='_blank' rel='noreferrer' className='text-base font-medium text-twilight-400 hover:underline'>{user.facebook_url ?? 'Not provided'}</a>
                 
                    </div>
                </div>
            </div>
           
            <ToastContainer />
        </div>
    );
};

SocialAccountsComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default SocialAccountsComponent;
