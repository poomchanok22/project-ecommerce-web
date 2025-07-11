import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { registerSchema } from '../utils/validators'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { authApi } from '../api/authApi'

function Register({ resetForm }) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur"
  })

  useEffect(() => {
    reset()
  }, [resetForm])

  const onSubmit = async data => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const resp = await authApi.post('/register', data)
      toast.success(resp.data.message)
      document.getElementById('register-form').close()
      reset()
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message
      toast.error(errMsg, {
        position: "top-left",
      })
    }
  }

  return (
    <>
      <h3 className="text-center text-xl font-semibold mb-2">REGISTER</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} className="flex flex-col gap-3">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            {...register('name')}
          />
          {errors.name?.message && <p className='text-sm text-error'>{errors.name.message}</p>}

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            className="input input-bordered w-full"
            min={0}
            {...register('age')}
          />
          {errors.age?.message && <p className='text-sm text-error'>{errors.age.message}</p>}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register('email')}
          />
          {errors.email?.message && <p className='text-sm text-error'>{errors.email.message}</p>}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register('password')}
          />
          {errors.password?.message && <p className='text-sm text-error'>{errors.password.message}</p>}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message && <p className='text-sm text-error'>{errors.confirmPassword.message}</p>}

          <button type="submit" className="btn btn-outline w-full mt-2">
            {isSubmitting ? <span className='loading loading-dots'></span> : "Sign up"}
          </button>
        </fieldset>
      </form>
    </>
  )
}

export default Register
