import {Link} from 'react-router-dom';
import { useState } from 'react';
import { Info } from 'lucide-react';


export default function ForgotPasswordForm () {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Email not found !');
                } 
                else if (response.status === 400){
                    throw new Error('Email is required !');
                }
                else {
                    throw new Error('Something went wrong ! Please try again.');
                }
            }
            return response.json();
        })
        .then( () => {
            localStorage.setItem('email', email);
            window.location.href = '/validate-code';
            
        })
        .catch(error => {
            console.error('There was a problem with the password reset:', error.message);
            setMessage(error.message);
        });
    }
 return (
  <div className="w-full max-w-md mx-auto bg-white px-6 py-10 rounded-3xl border-2 border-twilight-500 shadow-md shadow-twilight-100 md:max-w-2xl lg:max-w-3xl">
  <h1 className='text-3xl md:text-4xl lg:text-5xl pb-4 font-bold bg-gradient-to-r text-transparent from-twilight-500 to-twilight-100 bg-clip-text'>Forgot Password</h1>
  <p className="font-semibold text-md md:text-lg lg:text-xl text-twilight-300">Enter your email address to reset your password</p>
  <form onSubmit={handleSubmit}>
    <div className="mt-8">
      <div>
        <label className="text-md md:text-lg lg:text-xl font-medium text-twilight-400">Email</label>
        <input
          className="w-full border-2 border-twilight-200 rounded-xl p-2 md:p-4 mt-1 bg-transparent"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="mt-8 flex flex-col gap-y-4">
        <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-3 rounded-xl bg-gradient-to-r from-twilight-500 to-twilight-100 text-white text-lg font-bold">Reset Password</button>
      </div>
    </div>
    <div className="flex flex-col gap-y-4">
          {message && (
            <p className="mt-2 flex items-center py-3 mb-4 text-lg font-semibold text-red-800 rounded-xl bg-gradient-to-r from-red-200 to-red-50">
              <Info className="mr-2 ml-2" size={24} /> {message}
            </p>
          )}
        </div>
      </form>
      <div className="mt-8 flex items-center justify-center">
        <p className="text-md md:text-lg lg:text-xl font-medium text-twilight-500">Have you remembered your password?</p>
        <Link to="/" className="ml-2 font-medium text-md md:text-lg lg:text-xl text-twilight-400 underline hover:underline-offset-4">Sign In</Link>
      </div>
    </div>

    );

    
    }