import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../ui/loginForm'
import RegisterForm from '../ui/registerForm'

const Login = () => {
  const { type } = useParams()
  const [formType, setFormType] = useState(type === 'register' ? type : 'login')

  const toggleFormType = () => {
    setFormType((prev) => (prev === 'register' ? 'login' : 'register'))
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register' ? (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
              <p className="m-2">
                Already have accaunt?{' '}
                <a
                  style={{ color: 'blue' }}
                  role={'button'}
                  onClick={toggleFormType}
                >
                  Sign in
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Вход </h3>
              <LoginForm />
              <p className="m-2">
                Don&#39;t have account?{' '}
                <a
                  style={{ color: 'blue' }}
                  role={'button'}
                  onClick={toggleFormType}
                >
                  Sign up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
