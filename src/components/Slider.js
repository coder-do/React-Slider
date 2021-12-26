import React, { useEffect, useState } from "react";
import Dots from './Dots';
import Buttons from "./Buttons";
import { images } from "./images";
import SliderItem from './SliderItem';
import Video from "../assets/video.mp4";

const Slider = () => {
    const [sizeXY, setSizeXY] = useState(window.innerWidth);
    const [tDur, setTDur] = useState(0.6);
    const [x, setX] = useState(-100);
    const [firstTouch, setFirstTouch] = useState(0);
    const [width, setWidth] = useState(0);
    const [thisSlide, setThisSlide] = useState(0);
    const items = Array.from(document.querySelectorAll('.items'));

    useEffect(() => {
        document.getElementById("slider").addEventListener("resize", updateWidth);
        const width = document.getElementById("slider").clientWidth;
        setWidth(width);
        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, [sizeXY]);

    const updateWidth = () => {
        setSizeXY(window.innerWidth);
        const width = document.getElementById("slider").clientWidth;
        setWidth(width);
    };

    const goLeft = () => {
        setTDur(0.6);
        setX(x - 100);
        setTimeout(() => {
            if (x <= items.length * -100) {
                setTDur(0);
                setX(-100);
                setTDur(0.6);
            }
        }, 600);
    };

    const goRight = () => {
        setTDur(0.6);
        setX(x + 100);
        setTimeout(() => {
            if (x >= -100) {
                setTDur(0);
                setX(items.length * -100);
                setTDur(0.6);
            }
        }, 600);
    };

    const goToSelected = (e) => {
        setX(e.target.value * -100);
    };

    const handleTouchStart = (e) => {
        setThisSlide(x);
        setTDur(0);
        const firstTouch = (e.touches[0].clientX * 100) / sizeXY;
        setFirstTouch(firstTouch);
    };

    const handleTouchMove = (e) => {
        const client = (e.touches[0].clientX * 100) / sizeXY;
        const xDeff = client - firstTouch;
        if (xDeff % 2) {
            setX(thisSlide + xDeff);
        }
    };

    const handleTouchEnd = () => {
        setTDur(0.6);
        setX(Math.round(x / 100) * 100);
        if (x >= -50) {
            setTimeout(() => {
                setTDur(0);
                setX(items.length * -100);
                setTDur(0.6);
            }, 600);
        }

        if (x <= items.length * -100 - 50) {
            setTimeout(() => {
                setTDur(0);
                setX(-100);
                setTDur(0.6);
            }, 600);
        }
    };

    return (
        <div className='m-20 mx-auto overflow-hidden w-screen' id="slider">
            <div className='flex relative'>
                {images.map((slide) => {
                    return (
                        <SliderItem
                            handleTouchStart={handleTouchStart}
                            handleTouchMove={handleTouchMove}
                            handleTouchEnd={handleTouchEnd}
                            updateWidth={updateWidth}
                            key={slide.id}
                            tDur={tDur}
                            x={x + 100}
                        >
                            <ImageContent width={width} image={slide.image} />
                        </SliderItem>
                    );
                })}
                <SliderItem
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    updateWidth={updateWidth}
                    tDur={tDur}
                    x={x + 100}
                >
                    <VideoContent />
                </SliderItem>
                <SliderItem
                    handleTouchStart={handleTouchStart}
                    handleTouchMove={handleTouchMove}
                    handleTouchEnd={handleTouchEnd}
                    updateWidth={updateWidth}
                    tDur={tDur}
                    x={x + 100}
                >
                    <HtmlContent />
                </SliderItem>
                <Buttons goLeft={goLeft} goRight={goRight} />
            </div>
            <Dots items={items} goToSelected={goToSelected} x={x} />
        </div>
    );
}

function ImageContent({ image, width }) {
    return (
        <img
            id="sliderImg"
            className="w-full"
            src={image ? image : images[0].image}
            alt="Slider image"
            width={width + "px"}
        />
    )
}

function VideoContent() {
    return (
        <div className='m-0 mx-auto h-full flex items-center justify-center	bg-neutral-900'>
            <video
                width="59.3%"
                controls="controls"
            >
                <source src={Video} />
            </video>
        </div>
    )
}

function HtmlContent() {
    return (
        <div className='h-full w-full bg-teal-100 text-center text-4xl'>
            Hello
        </div>
    )
}

export default Slider;