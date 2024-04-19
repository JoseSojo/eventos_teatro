import { ReactNode } from "react"

interface Props {
    type: `button` | `submit`,
    customClass: string,
    text?: string,
    content?: ReactNode
    click: () => void
}

export default function Button ({type, customClass, click, text, content}: Props) {

    return <button className={customClass} type={type} onClick={click}> {text? text : ``}  {content?content:``} </button>
}

