import { Dispatch, SetStateAction } from "react";
import LinkTo from "../atoms/LinkTo";
import Title from "../atoms/Title";
import Image from "../atoms/Image";

interface Props {
    setSlide: Dispatch<SetStateAction<boolean>>,
    slide: boolean
}

export default function Header ({setSlide, slide}: Props) {

    const clsIcoLink = `w-[17px] h-[17px]`;

    return (
        <header>
            <div className="px-5 flex items-center justify-between">
                <div className="flex gap-3">
                    <button className="px-5 py-2 rounded-md bg-indigo-300 hover:bg-indigo-400 outline-none" onClick={()=> setSlide(!slide)}>
                        <Image alt="" customClass="w-[20px] h-[20px]" path="/main.svg" />
                    </button>
                    <Title customClass="text-2xl font-light text-gray-700" text="SitemBase" />
                </div>

                <nav className="flex pr-4 gap-6">
                    <LinkTo customClass="py-5 text-gray-500 hover:text-gray-700 font-bold text-monospace text-sm" path="/" text={<Image alt="" customClass={clsIcoLink} path="/home.svg" />} />
                    <LinkTo customClass="py-5 text-gray-500 hover:text-gray-700 font-bold text-monospace text-sm" path="/profile" text={<Image alt="" customClass={clsIcoLink} path="/user.svg" />} />
                    <LinkTo customClass="py-5 text-gray-500 hover:text-gray-700 font-bold text-monospace text-sm" path="/logout" text={<Image alt="" customClass={clsIcoLink} path="/logout.svg" />} />
                </nav>
            </div>
            
        </header>
    )
}

