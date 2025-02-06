import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from './login.module.scss';
import logo from '@/public/profile.png'
import Image from 'next/image'

export interface SignInProps {
    className?: string;
}

export interface LoginProps {
    className?: string;
}

interface ResponseData {
    username: string;
    usermode: string;
    id: number;
    token: string;
}


const Login = ({ className }: SignInProps) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameTextError, setUsernameTextError] = useState('');
    const [passwordTextError, setPasswordTextError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState<ResponseData | null>(null);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setUsernameError(false); // Reset the error state
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(false); // Reset the error state
    };

    const handleUsernameTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setUsernameTextError(''); // Reset the error state
        setUsernameError(false); // Reset the error state
    };

    const handlePasswordTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordTextError(''); // Reset the error state
        setPasswordError(false); // Reset the error state
    };

    useEffect(() => {
        if (responseData) {
            router.push('/dashboard', undefined, { shallow: true });
        }
    }, [responseData]);

    const handleLogin = async () => {
        if (!username && !password) {
            setUsernameTextError('Please enter a username.');
            setUsernameError(true); // Reset the error state
            setPasswordTextError('Please enter a password.');
            setPasswordError(true); // Reset the error state
          } else if (!username) {
            setUsernameTextError('Please enter a username.');
            setUsernameError(true); // Reset the error state
          } else if (!password) {
            setPasswordTextError('Please enter a password.');
            setPasswordError(true); // Reset the error state
          } else {

        try {
            setIsLoading(true);
            const response = await fetch('http://127.0.0.1:8000/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setResponseData(data);
                localStorage.setItem('token', data.token);
            } else {
                if (response.status === 401) {
                    setError('Invalid username or password. Please try again.');
                    setUsernameError(true);
                    setPasswordError(true);
                } else if (response.status === 403) {
                    setError('Access forbidden. Please check your credentials.');
                } else {
                    const errorMessage = data.error || 'An error occurred. Please try again later.';
                    setError(errorMessage);
                }
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Login failed', error);
        } finally {
            setIsLoading(false);
        }
    }
    };
    

    //<div className={styles.formClass}></div>

    return <div className={classNames(styles.root, className)}>
        <div className={styles.mainDiv}>
            <div className={styles.divTop}>
                <Image src={logo} alt="" className={styles.logoClass} />
                <h1>Sign In</h1>
            </div>
            <div className={styles.divMiddle}>
                 
                <div className={styles.divInput}>
                    <span className={styles.showClass}> <h5>Email</h5> </span>
                    <span className={styles.divSpanForm}>
                    <input
                placeholder="Enter email"
                type="Email"
                id="email"
                className={classNames(styles.inputForm, { [styles.errorBorder]: usernameError })}
                onChange={handleUsernameChange}
            />  
            </span>
                    </div>
                    <span className={styles.spanError}>
                    {usernameTextError && <h4 className={styles.error}>{usernameTextError}</h4>}
                    </span>
                   

                    <div className={styles.divInput}>
                        <span className={styles.showClass}> <h5>Password</h5> <button className={styles.showButton}>Show</button> </span>
                        <span className={styles.divSpanForm}>
                        <input
                placeholder="Enter password"
                type="password"
                id="password"
                className={classNames(styles.inputForm, { [styles.errorBorder]: passwordError })}
                onChange={handlePasswordChange}
            />



                        </span>
                        
                    </div>
                    <span className={styles.spanError}>
                    {passwordTextError && <h4 className={styles.error}>{passwordTextError}</h4>}
                    <button className={styles.forgotPassword}>Forgot Password?</button>
                    </span>
                        <br />
                        </div>
                <div className={styles.divMiddleButtons}>
                    <button className={styles.button1Class} onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}</button>
                    <button className={styles.button2Class} disabled={isLoading} onClick={handleLogin}>
                    {isLoading ? 'Logging in...' : 'Sign in with Google'}
                    </button>
                </div>
            </div>
            <div className={styles.divBottom}>
                <span className={styles.spanTop}>New to XXX? <a href="/" className={styles.linkClass}>Create an account</a></span>
                <span className={styles.spanBottom}>
                    <a href="/" className={styles.bottomLink}>Terms of Service</a>
                    <a href="/" className={styles.bottomLink}>Support</a>
                    <a href="/" className={styles.bottomLink}>New to XXX?</a>
                </span>
            </div>
        </div>;
};

export default Login;