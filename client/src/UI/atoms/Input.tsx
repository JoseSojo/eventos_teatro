import { Dispatch, SetStateAction } from "react";

interface Props {
    type: `text` | `email` | `password`,
    customClass: string,
    placeholder?: string,
    value: string,
    changeFn: Dispatch<SetStateAction<string>>

}

export default function Input ({type, customClass, placeholder, value, changeFn}: Props) {

    return <input
            className={customClass} 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => changeFn(e.target.value)}
        />;
}

