"use client";
import React, { createContext, SetStateAction, useState } from "react";

type ICoords = {
    x: number,
    y: number
}

enum position { tl, t, tr, cl, c, cr, bl, b, br };

type IText = {
    text: string,
    family: string,
    size: number,
    weight: number,
    spacing: number,
    opacity: number,
    lh: number,
    color: string,
    position: position;
} | null;

type IContext = {
    coords: ICoords[],
    setCoords: React.Dispatch<SetStateAction<ICoords[]>>,
    colors: string[],
    setColors: React.Dispatch<SetStateAction<string[]>>,
    opac: number,
    setOpac: React.Dispatch<SetStateAction<number>>,
    text: IText,
    setText: React.Dispatch<SetStateAction<IText>>
} 

const WallpaperContext = createContext<IContext>({
    coords: [],
    setCoords: () => { },
    colors: [],
    setColors: () => { },
    opac: 0,
    setOpac: () => { }, 
    text: null,
    setText: () => { }
});


const WallpaperProvider = ({
    children
}: {children: React.ReactNode}) => {
    const [coords, setCoords] = useState<ICoords[]>([
        { x: 97.733672, y: 20.620355 },
        { x: 50.620529, y: 94.403503 },
        { x: 47.789365, y: 76.353644 },
        { x: 12.65748, y: 66.477494 },
        { x: 30.503433, y: 98.971222 },
        { x: 2.400974, y: 98.77694 },
        { x: 31.061696, y: 29.232015 },
        { x: 29.661116, y: 21.45662 }
    ]);
    const [colors, setColors] = useState<string[]>([
        "#54A4E2",
        "#7380FE",
        "#BE1C8F",
        "#3A9027",
        "#4E8841",
        "#9AC878",
        "#AECA68",
        "#762B9C"
    ]
    )

    const [text, setText] = useState<IText>({
        text: "MNGI.",
        family: "Roboto",
        size: 30,
        weight: 400,
        spacing: 0.2,
        opacity: 0.4,
        lh: 1.2,
        color: "#ffffff",
        position: position.c
    });
    const [opac, setOpac] = useState<number>(0.2);
    return <WallpaperContext.Provider value={{coords, setCoords, colors, setColors, opac, setOpac, text, setText}}>
        {children}
    </WallpaperContext.Provider>
}
export type {IText};
export { WallpaperProvider, WallpaperContext };
    



