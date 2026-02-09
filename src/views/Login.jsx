import { useState, useEffect } from 'react';
import axios from "axios";
import '../assets/style.css';
import { useForm } from 'react-hook-form';

const API_BASE = import.meta.env.VITE_API_BASE;

function Login() {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
      defaultValues: {
        username: '',
        password: '',
      }
    })

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE}/admin/signin`, formData);
            const {token, expired} = response.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
            axios.defaults.headers.common['Authorization'] = token;
            alert("登入成功");
        } catch(error) {
            console.log(error.response);
        }
    };

    return (
      <div className="container login">
        <h1>由此登入</h1>
        <form className='form-floating' onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating mb-3">
            <input type="email" className='form-control'
            name='username' placeholder='name@example.com' 
            {...register('username', {
              required: "請輸入 Email ",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email 格式不正確",
              }
            })}
            />
            <label htmlFor="username">Email address</label>
            {errors.username && (<p className="text-danger">{errors.username.message}</p>)}
          </div>
          <div className="form-floating">
            <input type="password" className='form-control'
            name='password' placeholder='password'
            {...register('password', {
              required: "請輸入 password ",
              minLength: {
                value: 6,
                message: "密碼長度至少 6 位數",
              }
            })}
            />
            <label htmlFor="password">Password</label>
            {errors.password && (<p className="text-danger">{errors.password.message}</p>)}

          </div>
          <button type='submit' className='btn btn-primary w-100 mt-2'>登入</button>
        </form></div>
    )
}
export default Login;