import { ReactNode, useState } from "react";
import Header from "../organims/Header";
import SlideLeft from "../organims/SlideLeft";

interface Props {
    children: ReactNode
}

export default function GlobalLayout ({ children }: Props) {

    const [slide, setSlide] = useState(true);

    const slideCols = slide ? `grid-cols-[.15fr_1fr]` : `grid-cols-[60px_1fr]`;

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr] duration-200 transition-all bg-gray-100">
            <Header setSlide={setSlide} slide={slide} />
            <div className={`grid ${slideCols} h-[100%]`}>
                <div className={`duration-200 transition-all`}>
                    {slide ? <SlideLeft icon={false} /> : <SlideLeft icon={true} /> }
                </div>
                <div className="h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

