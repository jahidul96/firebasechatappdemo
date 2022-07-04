import React from 'react'
import { auth } from '../firebase'
import Person from '../images/person.jpg'
import { BiLogOutCircle, BiCheckDouble } from 'react-icons/bi'
import { signOut } from 'firebase/auth'

const Sidebar = ({ selectUser, users }) => {


    return (
        <div className='w-80 h-full overflow-y-auto sideBarStyle'>
            <Profile />
            <div className='h-16 bg-white my-3 px-3 flex items-center'>
                <p>Chats</p>
            </div>
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
                        className='flex  my-3  cursor-pointer  items-center justify-between  px-2 py-3 lightGary'
                        onClick={() => selectUser(user)}
                    >
                        <div className='flex items-center'>
                            <img
                                className='w-8 h-8 rounded-xl '
                                src={Person} alt='avator' />
                            <div className='ml-3'>
                                <p className='text-base font-medium mb-1'>{user.username}</p>
                                <div className='flex items-center'>
                                    <BiCheckDouble
                                        className='text-lg text-blue-400 mr-1'
                                    />
                                    <p className='text-sm'>last msg</p>
                                </div>

                            </div>
                        </div>

                        <div>
                            <p className='text-xs'>5July22</p>
                        </div>
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


export const Profile = () => {
    const signOutHandler = async () => {
        window.confirm('sure you want to logout?')
        await signOut(auth)

    }
    return (
        <div className='h-28 darkBlueColor md:rounded-bl-3xl  flex items-center justify-between px-2'>
            <div
                className='flex items-center'

            >
                <img
                    className='w-6 h-6 rounded-xl '
                    src={Person} alt='avator' />
                <p className='ml-2 font-semibold'>{auth?.currentUser?.email.length > 6 ? auth?.currentUser.email.slice(0, 7) + '.' : 'You'}</p>
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
