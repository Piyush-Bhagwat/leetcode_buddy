import React from 'react'

export const Button = ( {className, children, onClick}) => {
    return (
        <button className={`btn w-full  px-2 py-1 rounded-md shadow-sm hover:bg-neutral-800 bg-neutral-900 text-white active:bg-neutral-600 active:text-white disabled:bg-neutral-300  flex gap-2 justify-center items-center ${className}`} onClick={onClick}>{children}</button>
    )
}
