import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'error' });
  const [firstName, setFirstName] = useState('');
  const [lastName, setSecondName] = useState('');
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
    else if (name === 'firstName') setFirstName(value);
    else if (name === 'lastName') setSecondName(value);

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[^\s]).{8,}$/;

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: 'Please provide a valid email!', type: 'error' });
    } else if (!password.trim() || !strongPasswordRegex.test(password)) {
      setMessage({ text: 'Please provide a stronger password!', type: 'error' });
    } else if (!confirmPassword.trim() || password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match!', type: 'error' });
    } 
      else if (!firstName.trim()) {
      setMessage({ text: 'Please provide a first name!', type: 'error' });
    } else if (!lastName.trim()) {
      setMessage({ text: 'Please provide a last name!', type: 'error' });
    }

    else {
      setMessage(''); 
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password , firstName, lastName}),
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 409) {
              throw new Error('Email already exists !');       
            } else {
              throw new Error('Something went wrong ! Please try again.');
            }
          }
          return response.json();
        })
        .then(data => {
            setMessage({ text: data.message, type: 'success' });

        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error.message);
          setMessage({ text: error.message, type: 'fail' });

         });
    }
  };

  return (
  <div className="w-full max-w-md mx-auto bg-white px-6 py-10 rounded-3xl border-2 border-twilight-500 shadow-md shadow-twilight-100 md:max-w-2xl lg:max-w-3xl">
    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r text-transparent from-twilight-500 to-twilight-100 bg-clip-text'>Welcome to CoachCode</h1>
    <p className="font-semibold text-md md:text-lg lg:text-xl text-twilight-300 mt-4">Create an account to get all features</p>
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <div>
          <label className="text-md md:text-lg lg:text-xl font-medium text-twilight-400">Email</label>
          <input
            className="w-full border-2 border-twilight-200 rounded-xl p-2 md:p-4 mt-1 bg-twilight-100/10"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-md md:text-lg lg:text-xl font-medium text-twilight-400">First Name</label>
            <input
              className="w-full border-2 border-twilight-200 rounded-xl p-2 md:p-4 mt-1 bg-twilight-100/10"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="text-md md:text-lg lg:text-xl font-medium text-twilight-400">Second Name</label>
            <input
              className="w-full border-2 border-twilight-200 rounded-xl p-2 md:p-4 mt-1 bg-twilight-100/10"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Enter your second name"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-md md:text-lg lg:text-xl font-medium text-twilight-400">Password</label>
            <input
              type="password"
              className="w-full border-2 border-twilight-200 rounded-xl p-2 md:p-4 mt-1 bg-twilight-100/10"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="text-md md:text-lg lg:text-xl font-medium text-twilight-400">Confirm Password</label>
            <input
              type="password"
              className="w-full border-2 border-twilight-200 rounded-xl p-2 md:p-4 mt-1 bg-twilight-100/10"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-y-4">
        <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-3 rounded-xl bg-gradient-to-r from-twilight-500 to-twilight-100 text-white text-lg font-bold">
          Sign Up
        </button>
      </div>
      <div className="flex flex-col gap-y-4">
        {message.text && (
          <p className={`mt-2 flex items-center py-3 mb-4 text-lg font-semibold rounded-xl ${message.type === 'success' ? 'text-green-800 bg-gradient-to-r from-green-200 to-green-50' : 'text-red-800 bg-gradient-to-r from-red-200 to-red-50'}`}>
            <Info className="mr-2 ml-2" size={24} /> {message.text}
          </p>
        )}
      </div>
    </form>
    <div className="mt-4 flex items-center justify-center">
      <p className="text-md md:text-lg lg:text-xl font-medium text-twilight-500">Already have an account?</p>
      <Link to="/" className="ml-2 font-medium text-md md:text-lg lg:text-xl text-twilight-400 underline hover:underline-offset-4">Sign In</Link>
    </div>
  </div>
);

}
