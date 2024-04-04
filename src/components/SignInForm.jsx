import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok ) {
            if (response.status === 401) {
                throw new Error('Invalid password !');
            }
            else if (response.status === 404) {
                throw new Error('Invalid email !');
            } 
            else {
                throw new Error('Something went wrong ! Please try again.');
            }
          
        }
        return response.json();
      })
      .then(()=> {
        window.location.href = '/problems';
         
      })
      .catch(error => {
        console.error('There was a problem with the authentication:', error.message);
        setMessage(error.message);
      });
  };

  return (
    <div className="w-9/12 bg-white px-10 py-20 rounded-3xl border-2 border-twilight-500 shadow-md shadow-twilight-100">
      <h1 className='text-5xl font-bold bg-gradient-to-r text-transparent from-twilight-500 to-twilight-100 bg-clip-text'>Welcome Back</h1>
      <p className="font-semibold text-lg text-twilight-300 mt-4"> Welcome back! Please enter your details</p>
      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium text-twilight-400"> Email</label>
            <input
              className="w-full border-2 border-twilight-200 rounded-xl p-4 mt-1 bg-transparent"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-lg font-medium text-twilight-400"> Password</label>
            <input
              type="password"
              className="w-full border-2 border-twilight-200 rounded-xl p-4 mt-1 bg-transparent"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-3 rounded-xl md:bg-gradient-to-r from-twilight-500 to-twilight-100 text-white text-lg font-bold"> Sign In</button>
        </div>
        <div className="flex flex-col gap-y-4">
            {message && (
              <p className="mt-2 flex items-center py-3 mb-4 text-lg font-semibold text-red-800 rounded-xl md:bg-gradient-to-r from-red-200 to-red-50 ">
                <Info className="mr-2 ml-2" size={24} /> {message}
              </p>
            )}
          </div>
      </form>
      <div className="mt-2 flex justify-between items-center">
        <div>
          <Link to="/forgot-password" className="font-medium  text-base text-twilight-400 type underline hover:underline-offset-4"> Forgot your password?</Link>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <p className="text-lg font-medium text-twilight-500"> Don&apos;t have an account? </p>
        <Link to="/signup" className="ml-2 font-medium text-xl text-twilight-400 underline hover:underline-offset-4"> Sign Up</Link>
      </div>
    </div>
  );
}
