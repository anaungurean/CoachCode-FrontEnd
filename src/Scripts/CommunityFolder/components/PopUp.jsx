import PropTypes from 'prop-types';

function Popup({ imageURL, toggleImageSize }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="max-w-4xl w-full p-4">
                <div className="relative">
                    <button
                        onClick={toggleImageSize}
                        className="absolute top-0 right-0 m-4 p-2 text-white bg-twilight-500 rounded-full focus:outline-none z-10"
                    >
                        &#x2715;
                    </button>
                    <div className="flex justify-center">
                        <img src={imageURL} style={{ maxHeight: '80vh' }} className="rounded-lg" alt="Popup" />
                    </div>
                </div>
            </div>
        </div>
    );
}

Popup.propTypes = {
    imageURL: PropTypes.string.isRequired,
    toggleImageSize: PropTypes.func.isRequired,
};

export default Popup;
