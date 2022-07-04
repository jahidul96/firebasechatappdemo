import React, { useState, useRef, useEffect } from 'react'
import { ButtonComp, InputComp } from './Reuse'
import { collection, addDoc, Timestamp, } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { GrGallery } from 'react-icons/gr'
import { FiDelete } from 'react-icons/fi'
import { AiOutlineSend } from 'react-icons/ai'


const TextArea = ({ chatUser, msgs }) => {
    const [text, setText] = useState('')
    const [img, setImg] = useState('')

    const scrollRef = useRef();
    const userMe = auth.currentUser
    const id = userMe.uid > chatUser.uid ? `${userMe.uid + chatUser.uid}` : `${chatUser.uid + userMe.uid}`;


    const submitDetais = async (e) => {
        e.preventDefault()

        let url;
        if (img) {
            const imgRef = ref(
                storage,
                `images/${new Date().getTime()} - ${img.name}`
            );
            const snap = await uploadBytes(imgRef, img);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = dlUrl;
        }
        await addDoc(collection(db, "messages", id, "chat"), {
            text: text || '',
            from: userMe.email,
            to: chatUser.email,
            createdAt: Timestamp.fromDate(new Date()),
            Image: url || "",
        });



        setText("");
        setImg('')

    }
    const removeImg = () => {
        setImg('')
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs]);

    return (
        <>
            {
                chatUser ?
                    <div className='relative overflow-hidden'>
                        <div className='h-16 darkGrayColor flex items-center justify-center'>
                            <p className=' font-medium text-white md:text-lg'>{chatUser.username.toUpperCase()}</p>
                        </div>
                        <div className='messagesDiv md:px-5 px-3  py-3 overflow-y-auto '>

                            {
                                msgs.map((msg, i) => (
                                    <div
                                        key={i}
                                        ref={scrollRef}
                                        className={`flex  items-center mt-2 ${msg.from == userMe.email ? 'justify-end' : 'justify-start'}`}>

                                        {
                                            msg.Image ? <div className='chatMsgImgWrapper my-1'>
                                                <img
                                                    src={msg.Image}
                                                    alt="sent"
                                                />
                                                {
                                                    msg.text != '' && <p className={`${msg.from == userMe.email ? 'myMsg' : 'friendMsg'} similatmasTextStyle md:text-base mt-2 `}>{msg.text}</p>
                                                }

                                            </div> : <p className={`${msg.from == userMe.email ? 'myMsg' : 'friendMsg'} msgTextStyle p-2  mb-3 md:text-base similatmasTextStyle`}>{msg.text}</p>
                                        }




                                    </div>
                                ))
                            }



                        </div>

                        {
                            img.name && (
                                <div
                                    className='w-full h-14 flex items-center justify-center absolute bottom-20 bg-white left-0  '
                                >
                                    <GrGallery
                                        className="mr-2 text-blue-400 md:text-2xl text-base"
                                    />
                                    <p>{img.name.length > 15 ? img.name.slice(0, 14) + '...' : img.name}</p>
                                    <FiDelete
                                        className="ml-2  md:text-2xl text-base -mt-2 text-red-500 cursor-pointer "
                                        onClick={removeImg}
                                    />
                                    <AiOutlineSend
                                        className="ml-4  md:text-2xl text-base  text-blue-600 cursor-pointer "

                                        onClick={submitDetais}
                                    />

                                </div>
                            )
                        }
                        <form className='h-20 darkGrayColor flex items-center justify-center smallScreenPadding'>
                            <div className='bg-white p-3 flex justify-center rounded-lg items-center mr-3'>
                                <label htmlFor="img">
                                    <GrGallery
                                        size={18}
                                        className="cursor-pointer"
                                    />
                                </label>
                                <input
                                    onChange={(e) => setImg(e.target.files[0])}
                                    type="file"
                                    id="img"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </div>

                            <InputComp
                                placeholder={'enter text...'}
                                className="md:w-1/2 w-3/4 outline-none p-2 rounded-lg mr-3"
                                setValue={setText}
                                value={text}
                            />
                            <ButtonComp
                                btnText={'Send'}
                                className="ring-1 ring-gray-300 py-2 px-5 rounded-lg text-white font-medium"
                                submitDetais={submitDetais}
                            />
                        </form>
                    </div>


                    : <div
                        className='h-full darkGrayColor flex items-center justify-center text-white'
                    ><p>Select a user To start conversation</p></div>
            }


        </>
    )
}

export default TextArea