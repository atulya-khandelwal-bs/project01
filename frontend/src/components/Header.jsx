import React from 'react'

const Header = () => {
    return (
        <header className='bg-gray-800 text-white py-4'>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="./assets/react.svg" alt=" App name" className='w-10 h-10 mr-2' />
                    <h1 className='text-xl font-semibold'>Your App Name</h1>
                </div>
                <button className='bg-red-500 text-white py-2 px-4 rounded'> Sign Out</button>

            </div>
        </header>
    )
}

export default Header
