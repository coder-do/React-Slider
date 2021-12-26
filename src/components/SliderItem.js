import React from 'react';

const SliderItem = ({ children, x, tDur,
    handleTouchStart, handleTouchMove,
    handleTouchEnd, updateWidth, isLast, isFirst }) => {

    let className = 'items min-w-full';

    if (isLast || isFirst) {
        className = 'min-w-full';
    }

    return (
        <div
            className={className}
            style={{
                transform: `translateX(${x}%)`,
                transitionDuration: `${tDur}s`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={updateWidth}
        >
            {children}
        </div>
    )
}

export default SliderItem;