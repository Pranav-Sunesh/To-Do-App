import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(null);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if( password == ""){
            setError("Password cannot be empty");
            return
        }
        if(email == " "){
            setError("Please enter your email")
            return
        }
        if( !isLogin && password != confirmPassword ){
            setError("The passwords should match")
            return
        }
        const response = await axios.post(`http://localhost:5000/${isLogin?"login":"signin"}`,{email,password});
        if(!isLogin && response.data.name){
            setError("User already exist");
        }
        else if(isLogin){
            if(response.data.error){
                setError(response.data.error);
            }else{
                setCookie('email', response.data.email);
                setCookie('token', response.data.token);
                window.location.reload();

            }
        }
        else{
            setCookie('email', response.data.email);
            setCookie('token', response.data.token);
            window.location.reload();
        }
    }
  return (
    <div>
        <div className="auth-body">
            <div className="auth-container">
                <div className="container-top">
                <h2>{isLogin? "Log In":"Sign In"}</h2>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='User Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && <input 
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <div className="auth-go">
                    <input 
                        type="submit" 
                        value={isLogin? "LogIn":"SignIn"}
                        onClick={() =>setError(null)} />
                    </div>
                </form>
                </div>
                {error && <div className="error-container">
                    <p>{error}</p>
                </div>}
                <div className="login-signin">
                    <button 
                        className='login'
                        onClick={() => {
                            setIsLogin(true);
                            setError(null);
                        }}
                        style={{backgroundColor : isLogin?"#805f86": "#a881af"}}>
                        Log In</button>
                    <button 
                        className='signin' 
                        onClick={() => {
                            setIsLogin(false);
                            setError(null);
                        }}
                        style={{backgroundColor : !isLogin?"#805f86": "#a881af"}}>
                        Sign In</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth