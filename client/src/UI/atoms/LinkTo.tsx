import { ReactNode } from "react";
import { Link } from "wouter";

interface Props {
    text: string | ReactNode,
    customClass: string,
    path: string, 
}
export default function LinkTo ({customClass, text, path}: Props) {

    return <Link href={path} className={customClass}>{text}</Link>
}

