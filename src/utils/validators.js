import { string, number, object, ref } from "yup"

export const loginSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required')
}).noUnknown()

export const registerSchema = object({
  name: string().required('Name is required'),
  age: number().min(20, 'Age must be greater than 20').required('Age is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required'),
}).noUnknown()