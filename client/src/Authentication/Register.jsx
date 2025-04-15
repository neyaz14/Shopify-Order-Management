import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import AuthContext from '../Providers/AuthContext';
import { useLocation, useNavigate } from 'react-router';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
  
    const onSubmit = (data) => {
      console.log(data);
      // Handle form submission - API call would go here
      const email = data.email
        const password =data.password
        console.log(email, password);

        createUser(email, password)
            .then(result => {
                console.log('sign in', result.user)
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
        <div className="card w-full max-w-md bg-slate-800 shadow-xl border border-amber-400">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-amber-400 text-center mb-6">Create Account</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text text-gray-100">Coustomer Name</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter your username" 
                  className={`input input-bordered w-full bg-slate-900 text-gray-100 border-amber-400 focus:border-amber-500 focus:ring focus:ring-amber-400 focus:ring-opacity-50 ${errors.username ? 'input-error border-red-400' : ''}`}
                  {...register("displayName", { required: "Username is required" })}
                />
                {errors.username && <span className="text-red-400 text-sm mt-1">{errors.username.message}</span>}
              </div>
  
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text text-gray-100">Email</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className={`input input-bordered w-full bg-slate-900 text-gray-100 border-amber-400 focus:border-amber-500 focus:ring focus:ring-amber-400 focus:ring-opacity-50 ${errors.email ? 'input-error border-red-400' : ''}`}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email.message}</span>}
              </div>
  
              <div className="form-control w-full mb-6">
                <label className="label">
                  <span className="label-text text-gray-100">Password</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Enter your password" 
                  className={`input input-bordered w-full bg-slate-900 text-gray-100 border-amber-400 focus:border-amber-500 focus:ring focus:ring-amber-400 focus:ring-opacity-50 ${errors.password ? 'input-error border-red-400' : ''}`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                />
                {errors.password && <span className="text-red-400 text-sm mt-1">{errors.password.message}</span>}
              </div>
  
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className="btn bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold border-none"
                >
                  Register
                </button>
              </div>
            </form>
  
                <SocialLogin></SocialLogin>
            <div className="divider my-6 text-gray-400">OR</div>
            
          
            
            <div className="text-center text-gray-400">
              Already have an account? 
              <a href="/login" className="text-amber-400 hover:text-amber-500 ml-1">
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
  
    );
};

export default Register;