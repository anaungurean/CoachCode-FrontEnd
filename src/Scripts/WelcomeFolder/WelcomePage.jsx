import Slide from './components/Slide';

function WelcomePage() {
 

    return (
        <div className="flex flex-col lg:flex-row w-full h-screen">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <Slide />
            </div>
            <div className="hidden lg:flex h-full w-full lg:w-1/2 items-center justify-center bg-gradient-to-tr from-twilight-100 to-twilight-400">
            </div>
    </div>
    );
 }

export default WelcomePage;