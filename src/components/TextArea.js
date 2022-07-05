import React, { useState, useRef, useEffect } from 'react'
import { ButtonComp, InputComp } from './Reuse'
import { collection, addDoc, Timestamp, setDoc, doc, } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { IoMdPhotos } from 'react-icons/io'
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
            read: false
        });

        setDoc(doc(db, 'lastMsg', id), {
            text: text || '',
            from: userMe.email,
            to: chatUser.email,
            createdAt: Timestamp.fromDate(new Date()),
            Image: url || "",
            read: false
        })
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
                    <div className='h-screen overflow-hidden relative'>
                        <UserComp chatUser={chatUser} />
                        <div className='messagesDiv p-2'>
                            {
                                msgs.map((msg, i) => (
                                    <div
                                        key={i}
                                        ref={scrollRef}
                                        className={`flex  items-center mt-2 ${msg.from == userMe.email ? 'justify-end' : 'justify-start'}`}
                                    >

                                        {
                                            msg.Image ? <div className='chatMsgImgWrapper'>
                                                <img
                                                    src={msg.Image}
                                                    alt="sent"
                                                />

                                            </div> :
                                                <p className={`p-2 ${msg.from == userMe.email ? 'ligthBlueColor' : 'darkBluishColor '} rounded-md md:text-base text-sm text-white msgTextStyle`}>{msg.text}</p>
                                        }




                                    </div>
                                ))
                            }
                        </div>

                        {
                            img.name ? (
                                <ImgSendComp
                                    img={img}
                                    submitDetais={submitDetais}
                                    removeImg={removeImg}
                                />
                            ) : <div className='darkBluishColor h-20 flex items-center justify-center'>
                                <TextInputComp
                                    submitDetais={submitDetais}
                                    setImg={setImg}
                                    setText={setText}
                                    text={text}
                                />
                            </div>
                        }



                    </div>
                    :

                    <div
                        className='h-full darkBluishColor flex items-center justify-center text-white'
                    ><p>Select a user To start conversation</p></div>
            }
        </>

    )
}

export default TextArea

const UserComp = ({ chatUser }) => (
    <div className='darkBluishColor h-16 flex items-center justify-center'>
        <p className='text-white'>{chatUser.username}</p>
    </div>
)


const ImgSendComp = ({ img, removeImg, submitDetais }) => (
    <div
        className='w-full h-20 flex items-center justify-center absolute bottom-0 darkBluishColor left-0  '
    >
        <IoMdPhotos
            className="mr-2 text-white md:text-2xl text-base"
        />
        <p className='text-white'>{img.name.length > 15 ? img.name.slice(0, 14) + '...' : img.name}</p>
        <FiDelete
            className="ml-2  md:text-2xl text-base -mt-2 text-red-500 cursor-pointer "
            onClick={removeImg}
        />
        <AiOutlineSend
            className="ml-4  md:text-2xl text-base  text-white cursor-pointer "

            onClick={submitDetais}
        />

    </div>
)







const TextInputComp = ({ setImg, setText, submitDetais, text }) => {
    return (
        <form className='h-20 darkBluishColor flex items-center justify-center smallScreenPadding'>
            <div className='bg-white p-3 flex justify-center rounded-lg items-center mr-3'>
                <label htmlFor="img">
                    <IoMdPhotos
                        className="cursor-pointer text-xl text-red-500"
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
    )
}