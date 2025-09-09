import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';



function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate(); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmission = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/sign_up', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status)
        } else {
            const token = await response.json()
            console.log(token)
            localStorage.setItem('token', token)
            navigate('/survey')
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen transition-colors duration-300 font-sans">
            <div className="flex flex-col md:flex-row max-w-5xl w-full mx-4 my-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Left Pane - Join Us Section */}
            <div className="flex-1 p-10 md:p-12 text-center text-white bg-dark-brand flex flex-col justify-center items-center transition-colors duration-300 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                <h1 className="text-4xl md:text-4xl font-extrabold mb-4 leading-tight">Join Our Community!</h1>
                <p className="text-lg opacity-80 mb-6">Create an account to unlock better health and peace of mind</p>
                <div className="w-2/3 h-px bg-white opacity-20 my-4"></div>
                <p className="text-sm opacity-70">
                 insurance simplified, we've got you covered
                </p>
            </div>
    
            {/* Right Pane - Create Account Form */}
            <div className="flex-1 p-8 md:p-12 flex bg-white flex-col justify-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-700 text-center">Create an Account</h2>
    
                {/* Email and Password Form */}
                <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-700 mb-1">
                    Email Address
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-medium-brand rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-white dark:text-black transition-colors duration-200"
                    required
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-700 mb-1">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    className="w-full px-4 py-2 border border-medium-brand rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-white dark:text-black transition-colors duration-200"
                    onChange={handleChange}
                    required
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmission}
                    className="w-full bg-medium-brand hover:bg-dark-brand text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    Create Account
                </button>
                </form>
    
                {/* Or Divider */}
                <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
              
                </div>
                </div>

            </div>
            </div>
        </div>
    );
}

export default SignUp;