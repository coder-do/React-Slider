import React from 'react';
import icon from "../assets/c-reg.svg";
import icon2 from "../assets/c-solid.svg";

const Dots = ({ items, goToSelected, x }) => (
    <div className='w-full absolute flex items-center'>
        <ul className='p-0 flex m-0 mx-auto mt-5'>
            {items.map((_, index) => {
                return (
                    <div key={index}>
                        <li
                            className='mr-5 list-none'
                        >
                            <label htmlFor={index + 1} className='hover:cursor-pointer'>
                                <img
                                    src={index + 1 === Math.abs(x / -100) ? icon : icon2}
                                />
                            </label>
                            <input
                                className='opacity-60 invisible'
                                style={{ width: '3vh' }}
                                type="radio"
                                id={index + 1}
                                value={index + 1}
                                checked={Math.abs(x / -100) === index + 1}
                                onChange={goToSelected}
                            ></input>
                        </li>
                    </div>
                );
            })}
        </ul>
    </div>
);

export default Dots;