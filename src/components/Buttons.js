import React from 'react';

const Buttons = ({ goRight, goLeft }) => {
    const classes = `w-40 h-full absolute bg-transparent border-0 hover:cursor-pointer hover:bg-gray-50 hover:opacity-40 hover:brightness-50	`;
    return (
        <>
            <button
                className={`${classes} prev`}
                onClick={goRight}
            ></button>
            <button
                className={`${classes} right-0 next`}
                onClick={goLeft}
            ></button>
        </>
    )
}

export default Buttons;