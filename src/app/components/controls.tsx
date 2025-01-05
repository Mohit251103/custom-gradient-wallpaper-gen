"use client";

import React, { SetStateAction, useContext, useState } from "react";
import { WallpaperContext } from "../context/context_g";
import { RiArrowDropDownLine } from "react-icons/ri";
import {IText} from "../context/context_g"

enum position { tl, t, tr, cl, c, cr, bl, b, br };

const TextController = ({ setText, text }: { setText: React.Dispatch<SetStateAction<IText>>, text: IText }) => {
    const [opendd, setOpendd] = useState<boolean>(false);
    const fontFamilies = [
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Poppins'
    ];

    const handleChange = (e : any) => {
        setText({ ...text!, [e.target.name]: e.target.value });
    }
    
    return (
        <div className="w-full">
            <form className="flex flex-wrap justify-between py-1 px-2" action="">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="text" className="label">Text</label>
                    <input type="text" id="text" placeholder="MNGI." value={text!.text} className="input" name="text" onChange={handleChange}/>
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="family" className="label">Font Family</label>
                    <button className="border bg-none flex input" onClick={(e: any) => { e.preventDefault(); setOpendd((prev) => !prev) }}>
                        <span className="text-base">{text!.family}</span>
                        <RiArrowDropDownLine />
                    </button>
                    <div className={`mt-2 flex flex-col w-full p-2 h-0 border relative bg-white shadow-xl overflow-y-auto ${!opendd ? 'hidden' : ''} transition-all duration-250 ease-in-out`} style={{ height: `${opendd ? '150px' : ''}` }}>
                        {fontFamilies.map((family, idx) => {
                            return <button key={idx} className="w-full text-left my-1 h-fit text-base p-1 rounded-md hover:cursor-pointer hover:bg-gray-200" onClick={(e) => { e.preventDefault(); setText({ ...text!, family: family }); setOpendd(false); }}>{family}</button>
                        })}
                    </div>
                </div>

            </form>
        </div>
    )
}

const ColorsController = ({ setColors }: { setColors: React.Dispatch<SetStateAction<string[]>> }) => {
    return (
        <div className="">

        </div>
    )
}

const EffectController = ({ opac, setOpac }: { opac:number, setOpac: React.Dispatch<SetStateAction<number>> }) => {
    const handleChange = (e:any) => {
        setOpac(e.target.value / 100);
    }
    return (
        <div className="w-full">
            <form className="flex flex-wrap justify-between py-1 px-2" action="">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="noise">Noise Intensity</label>
                    <input type="range" id="noise" name="opac" min='0' max='100' onChange={handleChange} value={opac*100} className="range"/>
                </div>
            </form>
        </div>
    )
}


const Controls = () => {
    const { setColors, text, setText, opac, setOpac } = useContext(WallpaperContext);
    const [currTab, setCurrTab] = useState<string>("text");
    return (
        <div className="w-full h-[30vh] rounded-3xl shadow-xl mt-8 flex flex-col">
            <div className="text-sm flex justify-start items-center gap-4 w-full px-4 border-b">
                <button className={`${currTab === "text" ? "border-b border-black" : ""}`} onClick={() => { setCurrTab("text") }}>Text</button>
                <button className={`${currTab === "colors" ? "border-b border-black" : ""}`} onClick={() => { setCurrTab("colors") }}>Colors</button>
                <button className={`${currTab === "effects" ? "border-b border-black" : ""}`} onClick={() => { setCurrTab("effects") }}>Effects</button>
            </div>

            <div className="w-full px-2 mt-2">
                {currTab === "text" && <TextController setText={setText} text={text} />}
                {currTab === "colors" && <></>}
                {currTab === "effects" && <EffectController opac={opac} setOpac={setOpac}/>}
            </div>
        </div>
    )
}

export default Controls;