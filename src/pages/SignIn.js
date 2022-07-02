import React, { useState } from 'react'
import { ButtonComp, InputComp } from '../components/Reuse'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, setDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { Link } from 'react-router-dom'

export const SignIn = ({ setShow }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const collectionRef = collection(db, 'users')

    const submitDetais = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            setDoc(doc(collectionRef, result.user.uid), {
                username: name,
                email,
                uid: result.user.uid
            })

            console.log('all okay')
        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <div
            className='h-screen w-full flex justify-center items-center bg-gray-600'
        >
            <div
                className='w-80 h-2/4 bg-blue-600 singinAndLoginWrapper' >
                <InputComp
                    placeholder='username..'
                    className='inputStyle'
                    setValue={setName}
                />
                <InputComp
                    placeholder='email'
                    className='inputStyle'
                    setValue={setEmail}
                />
                <InputComp
                    placeholder='password'
                    className='inputStyle'
                    setValue={setPassword}
                    type={'password'}
                />

                <ButtonComp
                    btnText='Submit'
                    className="bg-gray-500 btnStyle "
                    submitDetais={submitDetais}
                />

                <div
                    className='
                    text-center
                    mt-3
                    '
                >
                    <p
                        className='text-white underline cursor-pointer text-sm'
                        onClick={() => { setShow(true) }}
                    >Already have an Account? Login!</p>
                </div>

            </div>
        </div>
    )
}






