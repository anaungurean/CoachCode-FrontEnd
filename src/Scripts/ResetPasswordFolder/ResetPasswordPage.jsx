import ResetPasswordForm from "./components/ResetPasswordForm";

function ResetPasswordPage() {
    return (
        <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
            <ResetPasswordForm />
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gradient-to-tr from-twilight-100 to-twilight-400">
           
        </div>
        </div>);
    }

export default ResetPasswordPage;
