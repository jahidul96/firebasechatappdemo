import React, { useState } from 'react'
import { ButtonComp, InputComp } from '../components/Reuse'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, setDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase'

export const SignIn = ({ setShow }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const collectionRef = collection(db, 'users')

    const submitDetais = async () => {


        if (!email || !name || !password) {
            return alert('please fill all the inputs')
        }
        if (email.length < 6 || password.length < 6) {
            return alert('email and password must be 6 character long!')
        }
        try {
            setLoading(false)
            const result = await createUserWithEmailAndPassword(auth, email, password);

            setDoc(doc(collectionRef, result.user.uid), {
                username: name,
                email,
                uid: result.user.uid
            })

            console.log('all okay')
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
                className='w-80 h-2/4 ligthBlueColor singinAndLoginWrapper' >
                <InputComp
                    placeholder='username..'
                    className='inputStyle'
                    setValue={setName}
                    value={name}
                />
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
                    btnText='Submit'
                    className="darkGrayColor btnStyle "
                    submitDetais={submitDetais}
                    loading={loading}
                    loadingText="Singing..In."
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






