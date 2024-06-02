import PropTypes from 'prop-types';


const PhotoComponent = ({ first_name, last_name, status, userId}) => {
    
         
    return (
    <div >

          <div className='text-center mb-4 relative'>
            <div className='flex justify-center'>
                <img src={`http://localhost:5000/user_photo/${userId}`} className='rounded-xl border border-gray-300 shadow-md w-40 h-40' alt={`${first_name} ${last_name}`} />     
            </div>
             
        </div>

        <div className='text-center mt-4 border-twilight-300 rounded-md text-twilight-500 bg-purple-50'>
            <h1 className='text-2xl font-bold text-twilight-400'>{first_name ?? 'No'} {last_name ?? 'name'}</h1>
            <h2 className='text-xl font-semibold text-twilight-300'>{status ?? 'No status'}</h2>
        </div>


         

    </div>
);


};

PhotoComponent.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    status: PropTypes.string,
    userId: PropTypes.number
};

export default PhotoComponent;
