

import { useEffect, useState } from "react";
import Sidebar, { ChatUser, Profile } from "../components/Sidebar";
import TextArea from "../components/TextArea";

import { collection, getDocs, doc, orderBy, query, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { auth, db } from "../firebase";
import { ChatText, TextComp } from "../components/Reuse";




export default function Home() {
    const [chatUser, setChatUser] = useState('')
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]);

    const thisUser = auth.currentUser.uid


    const usersRef = collection(db, 'users')

    const selectUser = async (chattter) => {
        setChatUser(chattter)

        const id = thisUser > chattter.uid ? `${thisUser + chattter.uid}` : `${chattter.uid + thisUser}`;

        const msgsRef = collection(db, "messages", id, 'chat');
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMessages(msgs);
        });

        await updateDoc(doc(db, 'lastMsg', id), {
            read: true
        })

        window.scrollTo(2000, 2000)

    }


    useEffect(() => {
        const q = query(usersRef, where("uid", "not-in", [thisUser]));

        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());

            });

            setUsers(users)

        });


    }, [])

    return (
        <div>
            <div className='w-full  md:hidden sm:block'>
                <Profile />
            </div>

            {/* small screen users div */}
            <div className='w-full md:hidden sm:block'>
                {
                    users.length ? users.map(user => (
                        <ChatUser
                            user={user}
                            key={user.uid}
                            selectUser={selectUser}
                        />
                    )) : <TextComp />
                }
            </div>
            <div className="flex md:divide-x md:divide-slate-500 overflow-hidden">

                {/* sidebar area */}


                <div className=' w-80  md:block hidden overflow-y-auto sideBarStyle'>
                    <Profile />
                    <ChatText />
                    {
                        users.length ? users.map(user => (
                            <ChatUser
                                user={user}
                                key={user.uid}
                                selectUser={selectUser}
                            />
                        )) : <TextComp />
                    }
                </div>

                {/* textfileld area */}

                <div className="flex-1 ">
                    <TextArea
                        chatUser={chatUser}
                        msgs={messages}
                    />
                </div>

            </div>
        </div>
    )
}
