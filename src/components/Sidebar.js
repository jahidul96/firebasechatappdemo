import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import Person from '../images/person.jpg'
import { BiLogOutCircle } from 'react-icons/bi'
import { signOut } from 'firebase/auth'
import { onSnapshot, doc } from 'firebase/firestore'
import { IoMdPhotos } from 'react-icons/io'


export const ChatUser = ({ user, selectUser }) => {

    const user2 = user?.uid;
    const currentUser = auth?.currentUser.email
    const thisUser = auth?.currentUser?.uid
    const [lastMsg, setLastMsg] = useState("");


    useEffect(() => {
        const id = thisUser > user2 ? `${thisUser + user2}` : `${user2 + thisUser}`;
        let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
            setLastMsg(doc.data());
        });
        return () => unsub();
    }, []);
    console.log(lastMsg)
    return (
        <div
            className='flex  my-3  cursor-pointer  items-center justify-between  px-2 py-3 lightGary'
            onClick={() => selectUser(user)}
        >
            <div className='flex items-center'>
                <img
                    className='w-8 h-8 rounded-xl '
                    src={Person} alt='avator' />
                <div className='ml-3'>
                    <p className='text-xs font-medium mb-1'>{user?.username.toUpperCase()}</p>
                    <div className='flex items-center'>

                        {lastMsg && (
                            <div className='flex items-center'>

                                <small className='mr-1 text-xs'>{lastMsg.from == currentUser ? 'You:' : ''}</small>
                                {
                                    lastMsg.Image ? <IoMdPhotos
                                        className="mt-1 text-black  text-xs"
                                    /> : <p className="text-xs">
                                        {lastMsg?.text.length > 10 ? lastMsg.text.slice(0, 9) + '...' : lastMsg.text}
                                    </p>
                                }

                            </div>

                        )}

                    </div>

                </div>
            </div>
            {
                lastMsg?.read == false && lastMsg.from != currentUser && <div className='w-5 h-5 rounded-full bg-red-600 flex items-center justify-center '>
                    <p className='text-xs text-white'>1</p>
                </div>
            }


        </div>
    )
}


export const Profile = () => {


    const signOutHandler = async () => {
        window.confirm('sure you want to logout?')
        await signOut(auth)

    }
    return (
        <div className='h-28 profileColor md:rounded-bl-3xl md:rounded-br-3xl  flex items-center justify-between px-2'>
            <div
                className='flex items-center'

            >
                <img
                    className='w-6 h-6 rounded-xl '
                    src={Person} alt='avator' />
                <p className='ml-2 font-semibold'>{auth?.currentUser?.email.length > 6 ? auth?.currentUser.email.slice(0, 5) + '...' : 'YourName'}</p>
            </div>
            <div
                className='bg-white p-1 rounded-full '
            >
                <BiLogOutCircle
                    className='text-lg text-blue-600 cursor-pointer '
                    onClick={signOutHandler}
                />
            </div>
        </div>
    )
}


