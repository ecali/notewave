import { useEffect, useState } from 'react';
import { isPasswordValid, isValidEmail } from '../utils/Validators';
import { useNavigate } from 'react-router-dom';
import { SignInWithSocialMedia } from '../modules/auth';
import { auth, Providers } from '../config/firebase';
import { getRoutePath } from '../utils/Routes';
import { RoutesName } from '../interfaces/Routes.interface';

export const LoginPage = () => {

    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState(true);
    const [errorSignIn, setErrorSignIn] = useState('');
    const [authenticating, setAuthenticating] = useState(false);

    useEffect(() => {
        if(auth.currentUser) navigate(getRoutePath(RoutesName.DASHBOARD));
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState)
    }

    const handleEmail = (value: string) => {
        setErrorEmail(!isValidEmail(value));
        setEmail(value);
        handleButtonStatus();
    }

    const handleButtonStatus = () => {
        setIsButtonDisabled((errorEmail || errorPassword) && authenticating);
    }

    const handlePassword = (value: string) => {
        setErrorPassword(!isPasswordValid(value));
        setPassword(value);
        handleButtonStatus();
    }

    const handleLoginWithGoogle = () => {
        if(!authenticating){
            if(errorSignIn !== '') setErrorSignIn('');
            setAuthenticating(true);
            SignInWithSocialMedia(Providers.google)
                .then(result => navigate(getRoutePath(RoutesName.DASHBOARD)))
                .catch(error => {
                    setAuthenticating(false);
                    setErrorSignIn(error.message);
                });
        }
    }

    return (
        <div className='flex flex-col w-full lg:w-1/2 mt-16'>
            <h3 className='uppercase font-bold tracking-wide md:-mb-4 '>start for free</h3>
            <p className='text-5xl text-silver leading-none '>Create new account<span className='text-7xl leading-none text-cornflower-blue'>.</span></p>
            <h3 className='font-thin tracking-wide '>Already Member? <span className='text-jet cursor-pointer'>Register</span></h3>
            <div className='flex flex-col'>
                <div className="flex flex-col md:w-2/3 w-full my-4 pr-4">
                    <div className='mb-4'>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => handleEmail(e.target.value)}
                               className="bg-charcoal border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-eerie-black focus:border-eerie-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                               placeholder="Insert Email..." required />
                        {errorEmail && email !== '' ? (<div className="text-red mt-1">Email incorrect</div>) : ''}
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>

                        <div className='relative w-full'>
                            <input value={password} onChange={(e) => handlePassword(e.target.value)}
                                type={isPasswordVisible ? 'text' : 'password'} id="password"
                                   className="w-full bg-charcoal border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-eerie-black focus:border-eerie-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                   placeholder="Insert Password..." required />
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                    </svg>

                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>

                                )}
                            </button>
                        </div>
                        {errorPassword && password !== '' ? (
                            <div className="text-red mt-1 ">
                                <div className='cursor-pointer group relative '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    <span
                                        className="absolute -top-1 left-5 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 text-silver">Must have 8 characters and at least one capital letter</span>
                                </div>

                            </div>
                        ) : ''}
                    </div>
                    <button disabled={isButtonDisabled} className={`w-full mt-8 rounded-lg  py-2 ${isButtonDisabled ? 'bg-charcoal cursor-default' : 'bg-cornflower-blue'} `}>Register</button>
                </div>
            </div>
            <div className='flex flex-col md:w-2/3 w-full my-4 pr-4'>
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div onClick={handleLoginWithGoogle} className='bg-silver w-2/3 m-auto flex flex-row p-2 rounded-lg text-jet justify-evenly items-center border-2 cursor-pointer'>
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'} alt={'Google Logo'} width='36px' height='36px' />
                    <p>LOGIN WITH GOOGLE</p>
                </div>
            </div>
        </div>
    );
}
