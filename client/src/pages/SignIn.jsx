import React, { useState } from 'react'
import { use } from 'react';
// import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {

  // const [error, setError]= useState(null);
  // const [loading, setLoading] =useState(false);  
  const dispatch =useDispatch();

  const {loading, error} =useSelector((state)=>state.user);
  const [formData, setFormData]=useState({});

  const navigate=useNavigate();


  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    console.log(formData)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
      // setLoading(true)
      dispatch(signInStart());
      const res= await fetch("/api/auth/signin",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data=await res.json();
      console.log(data);

      if(data.success==false){
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      
      // setError(null);
      // setLoading(false)
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

    // console.log(formData);
    
    

  }


  return (
    <div className='p-4 max-w-lg mx-auto '> 
      <h1 className='text-3xl  text-center font-semibold my-7 '>Sign In</h1>

      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-5 '>
      <input type="email" placeholder='Email ' className='border  p-4 rounded-lg' id='email' onChange={handleChange}/>
      <input type="password" placeholder='Password ' className='border  p-4 rounded-lg' id='password' onChange={handleChange}/>

      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-0'>
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      <OAuth/>

      </form>

      <div className=' flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
        <span className='text-blue-600'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 '>{error}</p>}
    </div>
  )
}

export default SignIn