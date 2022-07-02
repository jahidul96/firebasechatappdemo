import React from 'react'

const Sidebar = ({ selectUser, users }) => {

    return (
        <div className='w-80 overflow-y-auto sideBarStyle'>
            <ChatUser selectUser={selectUser} users={users} />
        </div>
    )
}

export default Sidebar

const ChatUser = ({ selectUser, users }) => {
    return (
        <>
            {
                users.length ? users.map(user => (
                    <div
                        key={user.uid}
                        className='flex m-2 cursor-pointer rounded-lg items-center justify-between p-3 bg-gray-300'
                        onClick={() => selectUser(user)}
                    >
                        <img
                            className='w-8 h-8 rounded-xl '
                            src='https://th.bing.com/th/id/OIP.fmZjDHGKQRbXqqngsT1qSwHaHl?pid=ImgDet&rs=1' alt='avator' />
                        <p>{user.username}</p>
                    </div>
                )) : <><p>No user found</p></>
            }
        </>
    )
}
