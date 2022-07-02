import React, { useState } from 'react'
import { ButtonComp, InputComp } from './Reuse'
import { collection, getDocs, addDoc, Timestamp, doc, query, where, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'


const TextArea = ({ chatUser, msgs }) => {
    const [text, setText] = useState('')
    const userMe = auth.currentUser
    const id = userMe.uid > chatUser.uid ? `${userMe.uid + chatUser.uid}` : `${chatUser.uid + userMe.uid}`;
    const submitDetais = () => {
        addDoc(collection(db, "messages", id, "chat"), {
            text,
            from: userMe.email,
            to: chatUser.email,
            createdAt: Timestamp.fromDate(new Date()),
        });
        setText("");
        console.log('text sent')

    }
    return (
        <>
            {
                chatUser ?
                    <div className=''>
                        <div className='h-16 bg-red-300 flex items-center justify-center'>
                            <p className='text-white'>{chatUser.username}</p>
                        </div>
                        <div className='messagesDiv bg-slate-500 p-3 overflow-y-auto '>

                            {
                                msgs.map((msg, i) => (
                                    <div key={i} className={`flex items-center ${msg.from == userMe.email ? 'justify-end' : 'justify-start'}`}>
                                        <p className={`${msg.from == userMe.email ? 'bg-blue-300' : 'bg-red-400'} text-white p-2 rounded-lg mb-3 text-sm`}>{msg.text}</p>
                                    </div>
                                ))
                            }

                        </div>
                        <div className='h-16 bg-red-300 flex items-center justify-center'>

                            <InputComp
                                placeholder={'enter text...'}
                                className="w-1/2 outline-none p-2 rounded-lg mr-3"
                                setValue={setText}
                            />
                            <ButtonComp
                                btnText={'Send'}
                                className="bg-slate-500 py-2 px-5 rounded-lg text-white font-semibold"
                                submitDetais={submitDetais}
                            />
                        </div>
                    </div>


                    : <div
                        className='h-full bg-slate-400 flex items-center justify-center text-white'
                    ><p>Select a user To start conversation</p></div>
            }


        </>
    )
}

export default TextArea