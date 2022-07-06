import React, { useState } from 'react'
import { ButtonComp, InputComp } from '../components/Reuse'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = ({ setShow }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)


    const submitDetais = async () => {
        if (!email || !password) {
            return alert('please fill all the inputs')
        }
        if (email.length < 6 || password.length < 6) {
            return alert('please provide right creadential!')
        }
        try {
            setLoading(false)
            await signInWithEmailAndPassword(auth, email, password)
            console.log('login succesfull')
            setLoading(true)
        } catch (err) {

            alert(err.message)
            setLoading(true)
        }

    }
    return (
        <div
            className='h-screen w-full flex justify-center items-center darkBluishColor'
        >
            <div
                className='
                w-80 
                h-2/4
                darkBlack 
                singinAndLoginWrapper
                '

            >
                <InputComp
                    placeholder='email'
                    className='inputStyle'
                    setValue={setEmail}
                    value={email}
                />
                <InputComp
                    placeholder='password'
                    className='inputStyle'
                    setValue={setPassword}
                    type={'password'}
                    value={password}
                />

                <ButtonComp
                    btnText='Login'
                    className="darkGrayColor btnStyle "
                    submitDetais={submitDetais}
                    loading={loading}
                    loadingText="Loging..in."
                />
                <div
                    className='
                    text-center
                    mt-3
                    '
                >
                    <p
                        className='text-white underline cursor-pointer text-sm'
                        onClick={() => setShow(false)}
                    >Don't have Account? Singup!</p>
                </div>

            </div>
        </div>

    )
}

export default Login