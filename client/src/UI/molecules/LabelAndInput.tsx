import { Dispatch, SetStateAction } from "react";
import Input from "../atoms/Input";
import Paragrap from "../atoms/Paragrap";

interface Props {
    error: boolean,
    value: string,
    type: string,
    change: Dispatch<SetStateAction<string>>,
    label: string
}

export default function LabelAndInput({error, change, value, label, type}: Props) {

    const clsInput = `px-2 py-1 border rounded-md outline-none`;

    return (
        <label className="grid">
            <span className="text-md text-gray-700">{label}</span>
            <Input changeFn={change} customClass={clsInput} type={type as `email` | `text`} value={value} placeholder="" />
            {error && <Paragrap customClass="font-light text-xs text-red-600 mb-2" text="debes completar este campo" />}
        </label>
    )
}
