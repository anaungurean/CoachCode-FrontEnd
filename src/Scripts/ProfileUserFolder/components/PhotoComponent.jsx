import PropTypes from 'prop-types';


const PhotoComponent = ({ photo_url, username }) => {

    return (
        <div className="flex flex-col items-center">
            <img src={photo_url} alt="profile" className="rounded-full h-32 w-32" />
            <p className="text-2xl font-bold">{username}</p>
        </div>
    )

}

PhotoComponent.propTypes = {
    photo_url: PropTypes.string,
    username: PropTypes.string
}
