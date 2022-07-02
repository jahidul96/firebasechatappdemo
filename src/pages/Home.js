

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TextArea from "../components/TextArea";

import { collection, getDocs, doc, orderBy, query, where, onSnapshot } from 'firebase/firestore'
import { auth, db } from "../firebase";




export default function Home() {
    const [chatUser, setChatUser] = useState('')
    const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]);

    const thisUser = auth.currentUser.uid
    const selecteduserId = chatUser.uid



    const usersRef = collection(db, 'users')

    const selectUser = (chattter) => {
        setChatUser(chattter)

        const id = thisUser > selecteduserId ? `${thisUser + selecteduserId}` : `${selecteduserId + thisUser}`;

        const msgsRef = collection(db, "messages", id, 'chat');
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
            });
            setMessages(msgs);
        });

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
        return () => unsub();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="flex divide-x divide-slate-200 overflow-hidden">
                <Sidebar selectUser={selectUser} users={users} />
                <div className="flex-1 textAreaHeight">
                    <TextArea chatUser={chatUser} msgs={messages} />
                </div>

            </div>
        </div>
    )
}
