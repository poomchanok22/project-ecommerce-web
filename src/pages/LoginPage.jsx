import React, { useState } from 'react'
import BlackLabel from "../assets/allwhisky_black_label_all-devices.webp"
import BlueLabel from "../assets/bluelabelmenu.avif"
import useUserStore from '../stores/userStore'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from '../utils/validators'
import Register from './Register'
import { useNavigate  } from 'react-router'

function Login() {
  const [resetForm, setResetForm] = useState(false)
  const login = useUserStore(state => state.login)
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const hdlClose = () => {
    console.log("dialog close")
    setResetForm(prv => !prv)
  }

  const hdlLogin = async data => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const resp = await login(data)
      navigate('/')
    } catch (err) {
      const errMsg = err.response?.error || err.message
      toast(errMsg)
    }
  }

  return (
    <>
      <div className='min-h-screen w-full flex items-center justify-center bg-neutral'>
        <div className='flex flex-col lg:flex-row w-[90%] max-w-6xl shadow-2xl rounded-xl overflow-hidden'>

          {/* Left Section - Image and Text */}
          <div className='lg:w-1/2 bg-neutral p-8 flex flex-col justify-center gap-4 text-white'>
            <div className="flex justify-center">
              <img src={BlueLabel} alt="whisky" className='w-40 rounded-xl border-4 border-primary' />
            </div>
            <h1 className='text-4xl font-black tracking-widest text-center leading-tight'>
              THE MAN<br />
              WHO <span className='text-primary'>WALKED</span><br />
              AROUND<br />
              THE WORLD
            </h1>
            <p className='text-sm leading-relaxed opacity-70'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla feugiat libero, ac pellentesque orci interdum ut.
            </p>
            <div className="flex justify-center">
              <img src={BlackLabel} alt="whisky black" className='w-32 rounded-lg' />
            </div>
          </div>

          {/* Right Section - Login Card */}
          <div className='lg:w-1/2 bg-base-100 flex items-center justify-center'>
            <div className='card w-full max-w-sm shadow-xl border rounded-lg'>
              <div className='card-body'>
                <h2 className='text-center text-2xl font-bold'>LOGIN</h2>
                <form onSubmit={handleSubmit(hdlLogin)}>
                  <fieldset disabled={isSubmitting} className='flex flex-col gap-2'>
                    <label className="label">Email</label>
                    <input type="text" className='input input-bordered w-full' placeholder='email' {...register('email')} />
                    {errors.email?.message && <p className='text-sm text-error'>{errors.email.message}</p>}

                    <label className="label">Password</label>
                    <input type="password" className='input input-bordered w-full' placeholder='password' {...register('password')} />
                    {errors.password?.message && <p className='text-sm text-error'>{errors.password.message}</p>}

                    <button className='btn btn-soft mt-4' type='submit'>
                      {isSubmitting ? (
                        <span className='loading loading-bars loading-md'></span>
                      ) : "Login"}
                    </button>
                    <button
                      type="button"
                      className='btn btn-outline mt-2'
                      onClick={() => document.getElementById('register-form').showModal()}
                    >
                      Sign up
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <dialog id="register-form" className="modal" onClose={hdlClose}>
        <div className="modal-box border shadow-lg">
          <Register resetForm={resetForm} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default Login
