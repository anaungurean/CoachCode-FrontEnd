import SignUpForm from "./components/SignUpForm";

function SignUpPage() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-1/2 flex items-center justify-center  ">
                <SignUpForm />
            </div>
         <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gradient-to-tr from-twilight-100 to-twilight-400">
           
        </div>
        </div>
    );
}

export default SignUpPage;
