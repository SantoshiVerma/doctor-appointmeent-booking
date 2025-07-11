import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Login = () => {


  const {backendUrl,token,setToken} =useContext(AppContext)
   const navigate = useNavigate()

  const [state, setState] = useState('Sign Up');



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Logic to handle login/signup goes here

    try{

      if( state == 'Sign Up'){
        const {data} =await axios.post(backendUrl+'/api/user/register',{name,email,password})

        if(data.success){
         localStorage.setItem('token',data.token)
         setToken(data.token)

        } else{
          toast.error(data.message)
        }

      } else{

        const {data} =await axios.post(backendUrl+'/api/user/login',{email,password})

        if(data.success){
         localStorage.setItem('token',data.token)
         setToken(data.token)

        } else{
          toast.error(data.message)
        }
          
      }
    } catch(error){
        toast.error(error.message)
    }
  }


useEffect (()=>{

  if(token){
     navigate('/')
  }

},[token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="flex flex-col gap-4 w-full max-w-sm bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.
        </p>

        {state === 'Sign Up' && (
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Your full name"
              className="border border-gray-300 rounded-md px-3 py-2 outline-primary focus:border-primary"
              required
            />
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
            className="border border-gray-300 rounded-md px-3 py-2 outline-primary focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md px-3 py-2 outline-primary focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white font-medium py-2 rounded-md hover:bg-opacity-90 transition duration-200"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-sm text-center text-gray-600">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-primary font-medium cursor-pointer hover:underline"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login here' : 'Sign up here'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
