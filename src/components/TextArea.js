import React, { useState, useRef, useEffect } from 'react'
import { ButtonComp, InputComp } from './Reuse'
import { collection, addDoc, Timestamp, } from 'firebase/firestore'
import { auth, db } from '../firebase'


const TextArea = ({ chatUser, msgs }) => {
    const [text, setText] = useState('')

    const scrollRef = useRef();
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



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs]);


    return (
        <>
            {
                chatUser ?
                    <div className=''>
                        <div className='h-16 darkBlack flex items-center justify-center'>
                            <p className='text-white font-medium md:text-xl'>{chatUser.username.toUpperCase()}</p>
                        </div>
                        <div className='messagesDiv darkGrayColor p-3 overflow-y-auto '>

                            {
                                msgs.map((msg, i) => (
                                    <div
                                        key={i}
                                        ref={scrollRef}
                                        className={`flex items-center mt-2 ${msg.from == userMe.email ? 'justify-end' : 'justify-start'}`}>
                                        <p
                                            className={`${msg.from == userMe.email ? 'ligthBlueColor text-white' : 'lightGary text-black'} msgTextStyle p-2 rounded-md mb-3 md:text-base font-normal text-xs align-baseline`}>{msg.text}</p>

                                    </div>
                                ))
                            }

                        </div>
                        <div className='h-16 ligthBlueColor flex items-center justify-center smallScreenPadding'>

                            <InputComp
                                placeholder={'enter text...'}
                                className="md:w-1/2 w-3/4 outline-none p-2 rounded-lg mr-3"
                                setValue={setText}
                                value={text}
                            />
                            <ButtonComp
                                btnText={'Send'}
                                className="darkGrayColor py-2 px-5 rounded-lg text-white font-medium"
                                submitDetais={submitDetais}
                            />
                        </div>
                    </div>


                    : <div
                        className='h-full darkGrayColor flex items-center justify-center text-white'
                    ><p>Select a user To start conversation</p></div>
            }


        </>
    )
}

export default TextArea