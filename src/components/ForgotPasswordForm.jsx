import {Link} from 'react-router-dom';

export default function ForgotPasswordForm () {
 return (
    <div className="w-9/12 bg-white px-10 py-20 rounded-3xl border-2 border-twilight-500 shadow-md shadow-twilight-100">
        <h1 className='text-5xl pb-4 font-bold bg-gradient-to-r text-transparent from-twilight-500 to-twilight-100 bg-clip-text'>Forgot Password</h1>
        <p className="font-semibold text-lg text-twilight-300 "> Enter your email address to reset your password</p>
        <div className="mt-8">
            <div>
                <label className="text-lg font-medium text-twilight-400"> Email</label>
                <input className="w-full border-2 border-twilight-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter your email"/>
            </div>
        
            <div className="mt-8 flex flex-col gap-y-4">
                <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-3 rounded-xl md:bg-gradient-to-r from-twilight-500 to-twilight-100 text-white text-lg font-bold"> Reset Password</button>
            </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
                <p className="text-lg font-medium text-twilight-500 "> Have you remember your password? </p>
                <Link to="/" className="ml-2 font-medium text-xl text-twilight-400 underline hover:underline-offset-4"> Sign In</Link>
            </div>
        </div>
 );

}