
import{ useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

export default function ValidateCodeForm() {
    const [reset_code, setCode] = useState(Array.from({ length: 6 }, () => ''));
    const [message, setMessage] = useState('');
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newCode = [...reset_code];
        
        newCode[index] = value;
        setCode(newCode);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowLeft') {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        } else if (e.key === 'ArrowRight') {
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = reset_code.join('');
        const email = localStorage.getItem('email');
 
        fetch('http://localhost:5000/check-resetcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, reset_code: code }),
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        throw new Error('Email and reset code are required');
                    }
                    else if (response.status === 404) {
                        throw new Error('Reset code has expired');
                    }
                    else if (response.status === 465) {
                        throw new Error('Invalid reset code');
                    }
                    else {
                        throw new Error('Something went wrong ! Please try again.');
                    }
                }
                return response.json();
            })
            .then(() => {
                window.location.href = '/reset-password';
            })
            .catch(error => {
                console.error('There was a problem with the password reset:', error.message);
                setMessage(error.message);
            });
    };

    useEffect(() => {
        inputRefs.current[0].focus();  
    }, []);

    return (
        <div className="w-9/12 bg-white px-10 py-20 rounded-3xl border-2 border-twilight-500 shadow-md shadow-twilight-100">
            <h1 className='text-5xl pb-4 font-bold bg-gradient-to-r text-transparent from-twilight-500 to-twilight-100 bg-clip-text'> Validate reset code </h1>
            <p className="font-semibold text-lg text-twilight-300 "> Please, enter the reset code that you received on mail </p>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <div className='flex flex-row justify-center justify-around'>
                        {reset_code.map((value, index) => (
                            <input
                                ref={(ref) => inputRefs.current[index] = ref}
                                key={index}
                                type="text"
                                className="w-12 h-12 text-2xl text-center font-semibold border-2 border-twilight-500 rounded-xl bg-violet-50"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out py-3 rounded-xl md:bg-gradient-to-r from-twilight-500 to-twilight-100 text-white text-lg font-bold"> Validate code </button>
                </div>
                <div className="flex flex-col gap-y-4">
                    {message && (
                        <p className="mt-2 flex items-center py-3 mb-4 text-lg font-semibold text-red-800 rounded-xl md:bg-gradient-to-r from-red-200 to-red-50 ">
                            <Info className="mr-2 ml-2" size={24} /> {message}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
