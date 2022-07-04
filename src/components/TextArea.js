import React, { useState, useRef, useEffect } from 'react'
import { ButtonComp, InputComp } from './Reuse'
import { collection, addDoc, Timestamp, } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { GrGallery } from 'react-icons/gr'


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
        addDoc(collection(db, "messages", id, "chat"), {
            text: text || '',
            from: userMe.email,
            to: chatUser.email,
            createdAt: Timestamp.fromDate(new Date()),
            Image: url || "",
        });
        setText("");
        setImg('')
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
                        <div className='messagesDiv  p-3 overflow-y-auto '>

                            {
                                msgs.map((msg, i) => (
                                    <div
                                        key={i}
                                        ref={scrollRef}
                                        className={`flex  items-center mt-2 ${msg.from == userMe.email ? 'justify-end' : 'justify-start'}`}>

                                        {
                                            msg.Image ? <div className='chatMsgImgWrapper my-3'>
                                                <img src={msg.Image} alt="sent" />
                                                {
                                                    msg.text != '' && <p className={`${msg.from == userMe.email ? 'ligthBlueColor text-white' : 'lightGary text-black'} msgTextStyle p-2  mb-3 md:text-base font-normal text-xs align-baseline`}>{msg.text}</p>
                                                }

                                            </div> : <p className={`${msg.from == userMe.email ? 'ligthBlueColor text-white' : 'lightGary text-black'} msgTextStyle p-2 rounded-md mb-3 md:text-base font-normal text-xs align-baseline`}>{msg.text}</p>
                                        }




                                    </div>
                                ))
                            }

                        </div>
                        <form className='h-16 darkBlack flex items-center justify-center smallScreenPadding'>
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
                                className="darkGrayColor py-2 px-5 rounded-lg text-white font-medium"
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