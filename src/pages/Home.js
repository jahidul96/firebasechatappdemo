

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar, { ChatUser } from "../components/Sidebar";
import TextArea from "../components/TextArea";

import { collection, getDocs, doc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { auth, db } from "../firebase";




export default function Home() {
    const [chatUser, setChatUser] = useState('')
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]);

    const thisUser = auth.currentUser.uid




    const usersRef = collection(db, 'users')

    const selectUser = (chattter) => {
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

        window.scrollTo(2000, 2000)

    }
    console.log(messages)


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
            <Navbar />
            <div className='w-full md:hidden sm:block'>
                <ChatUser selectUser={selectUser} users={users} />
            </div>
            <div className="flex divide-x divide-slate-200 overflow-hidden">
                <div className="md:block hidden rounded-tr-xl">
                    <Sidebar selectUser={selectUser} users={users} />
                </div>

                <div className="md:flex-1  textAreaHeight">
                    <TextArea chatUser={chatUser} msgs={messages} />
                </div>

            </div>
        </div>
    )
}
