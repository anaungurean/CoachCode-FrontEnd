import SignUpForm from "../components/SignUpForm";
import SlideWall from "../assets/SlideWall.jpg"

function SignUpPage() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <SignUpForm />
            </div>
            <div className="hidden relative lg:flex h-full w-1/2">
                <img src={SlideWall} className="w-full h-full object cover" />
            </div>
        </div>
    );
}

export default SignUpPage;
