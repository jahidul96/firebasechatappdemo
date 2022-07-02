import React, { useState } from 'react'
import Login from './Login'
import { SignIn } from './SignIn'

const AuthPage = () => {
  const [show, setShow] = useState(false)
  return (
    <div>
      {
        show ? <Login setShow={setShow} /> : <SignIn setShow={setShow} />
      }
    </div>
  )
}

export default AuthPage