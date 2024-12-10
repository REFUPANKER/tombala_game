import React from 'react'
import imgStone from "../app/res/stone.png";

export default function Stone({ num }: { num: number }) {
    return (
        <div
            className="w-[5vh] md:w-[8vh] aspect-square bg-center bg-contain bg-no-repeat flex justify-center items-center"
            style={{ backgroundImage: `url(${imgStone.src})` }}>
            <h1 className="text-xl md:text-2xl mix-blend-difference absolute" style={{fontFamily:"impact"}}>{num}</h1>
        </div>
    )
}
