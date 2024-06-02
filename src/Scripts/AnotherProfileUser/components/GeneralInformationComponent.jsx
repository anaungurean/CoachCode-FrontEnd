import PropTypes from 'prop-types';

const GeneralInformationComponent = ({ user }) => {

     

    return (
        <div className="p-4">
        <div className='text-center mb-4 flex justify-between items-center'>
            <div className='flex-grow'>
                <h1 className='text-2xl font-bold text-twilight-400'>General Information</h1>
            </div>

           
        </div>
    
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor='firstName' className='mb-2 text-twilight-500 font-medium text-lg'>First Name:</label>
                    <input
                        type='text'
                        id='firstName'
                        name='first_name'
                        value={user.first_name ?? 'Not provided'}
                        className='p-2 border border-twilight-300 rounded bg-purple-50'
                        disabled= {true}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='lastName' className='mb-2 font-medium text-lg'>Last Name:</label>
                    <input
                        type='text'
                        id='lastName'
                        name='last_name'
                        value={user.last_name ?? 'Not provided'}
                        className='p-2 border border-twilight-300 rounded bg-purple-50'
                        disabled= {true}
                    />
                </div>
                 <div className='flex flex-col'>
                    <label htmlFor='username' className='mb-2 font-medium text-lg'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={user.username ?? 'Not provided'}
                        className='p-2 border border-twilight-300 rounded bg-purple-50'
                        disabled= {true}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='mb-2 font-medium text-lg'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={user.email ?? 'Not provided'}
                        className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50'
                        disabled= {true}
                    />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='status' className='mb-2 font-medium text-lg'>Status:</label>
                    <input
                        id='status'
                        name='status'
                        value={user.status ?? 'Not provided'}
                        className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50'
                        disabled= {true}
                    >
                    </input>
                    
                       
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='goal' className='mb-2 font-medium text-lg'>Goal:</label>
                    <input
                        id='goal'
                        name='goal'
                        value={user.goal }
                        className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50'
                        disabled= {true}
                    >
                    </input>
                </div>
            </div>

        </div>
    );
};

GeneralInformationComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default GeneralInformationComponent;
