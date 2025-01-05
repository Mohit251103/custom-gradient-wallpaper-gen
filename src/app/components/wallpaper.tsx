"use client";
import { useContext, useRef, useState } from "react";
import { MdLoop } from "react-icons/md";
import { LuUndo } from "react-icons/lu";
import { LuDownload } from "react-icons/lu";
import { WallpaperContext } from "../context/context_g";
import { Roboto, Open_Sans, Lato, Montserrat, Poppins } from "next/font/google";
import html2canvas from "html2canvas";

const roboto = Roboto({ subsets: ['latin'], weight: ['100', "300", '400', '500', '700', '900'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ["300", "400", "500", "700", "600", "800"] });
const lato = Lato({ subsets: ['latin'], weight: ['100', "300", '400', '700', '900'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['100', '200', "300", '400', '500', '600', '700', '800', '900'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', "300", '400', '500', '600', '700', '800', '900'] });

const family_map: { [key: string]: string } = {
    Roboto: roboto.style.fontFamily,
    'Open Sans': openSans.style.fontFamily,
    Lato: lato.style.fontFamily,
    Montserrat: montserrat.style.fontFamily,
    Poppins: poppins.style.fontFamily
}

const Wallpaper = () => {

    const { coords, setCoords, colors, opac, setOpac, text } = useContext(WallpaperContext);
    const canvas = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const handleChangeWallpaper = (e: any) => {
        e.preventDefault();
        let newCoords = coords.map((c, i) => {
            return {
                x: Math.random() * 100,
                y: Math.random() * 100
            }
        });
        let newOpac = Math.random();
        setCoords(newCoords);
        setOpac(newOpac);
    }

    const handleDownload = (e: any) => {
        const wallpaper = container.current;
        wallpaper?.classList.remove('rounded-3xl');
        html2canvas(wallpaper!, {
            ignoreElements(element) {
                return element.classList.contains('exclude');
            }
        }).then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.classList.add('hidden');
            link.href = dataUrl!;
            link.download = 'image.png';
            link.click();
            wallpaper?.classList.add('rounded-3xl');
        })
    }

    return (
        <div className="w-full h-[55vh] rounded-3xl rounded-3xl overflow-hidden">
            <div className="w-full h-full relative overflow-hidden bg-none" id="wallpaper" ref={container}>
                <canvas ref={canvas} className="w-full h-full absolute top-0 left-0" style={{ opacity: opac, mixBlendMode: "overlay" }} id="canvas"></canvas>
                <div className="w-full h-full absolute top-0 left-0 bg-black" style={{ opacity: opac, mixBlendMode: "overlay" }}></div>
                <p className="w-full h-full absolute text-center top-1/2 -translate-y-8 text-white text-3xl Roboto" style={{ fontFamily: family_map[text!.family], fontWeight: text!.weight }}>{text!.text}</p>
                <svg className="w-full h-full">
                    {
                        coords.map((coord, index) => {
                            return <circle cx={`${coord.x}%`} cy={`${coord.y}%`} r="30%" fill={colors[index]} className="blur-[100px]" />
                        })
                    }
                </svg>
                <div className="exclude absolute bottom-8 right-8 flex">
                    <button className="icons hover:scale-110" onClick={handleChangeWallpaper}>
                        <MdLoop />
                    </button>
                    <button className="icons hover:scale-110" onClick={handleDownload}>
                        <LuDownload />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Wallpaper;

