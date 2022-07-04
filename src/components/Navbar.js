import React from 'react'
import { ButtonComp } from './Reuse'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'


const Navbar = () => {
    const signOutHandler = async () => {
        window.confirm('sure you want to logout?')
        await signOut(auth)

    }
    return (
        <div
            className='flex h-16 darkBlack items-center justify-between px-3 text-white'
        >
            <div
                className=''
            >
                <h3 className='text-lg'>JITextApp</h3>
            </div>
            <div
                className='flex items-center'
            >
                <ButtonComp
                    btnText='Signout'
                    className="darkGrayColor ml-6 px-4 py-1 rounded-md "
                    submitDetais={signOutHandler}
                />
            </div>
        </div>
    )
}

export default Navbar