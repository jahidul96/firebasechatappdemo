import React from 'react'
import Person from '../images/person.jpg'

const Sidebar = ({ selectUser, users }) => {

    return (
        <div className='w-64 h-full  overflow-y-auto sideBarStyle'>
            <ChatUser selectUser={selectUser} users={users} />
        </div>
    )
}

export default Sidebar

export const ChatUser = ({ selectUser, users }) => {
    return (
        <>
            {
                users.length ? users.map(user => (
                    <div
                        key={user.uid}
                        className='flex mx-2 my-3 ring-2  cursor-pointer rounded-lg items-center md:justify-between px-3 py-2 lightGary'
                        onClick={() => selectUser(user)}
                    >
                        <img
                            className='w-6 h-6 rounded-xl '
                            src={Person} alt='avator' />
                        <p className='md:ml-0 ml-4 font-semibold'>{user.username}</p>
                    </div>
                )) :
                    <div
                        className='h-full w-full flex justify-center items-center'
                    >
                        <p
                            className='text-center py-2 font-semibold text-white'
                        >No user found</p></div>
            }
        </>
    )
}
