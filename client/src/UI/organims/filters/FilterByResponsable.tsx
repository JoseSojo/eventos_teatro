import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Button from "../../atoms/Button";

interface Props {
    update: Dispatch<SetStateAction<string>>,
    updateVl: string,
    set: () => void
}

export default function FilterByResponsable ({update, set, updateVl}: Props) {

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        update(e.target.value);
    }

    return (<div className="flex">
        <input 
            onChange={HandleChange}
            className="rounded-l-md p-2 text-gray-800 border"
            type="text"
            value={updateVl}
            placeholder="Nombre del Responsable"
            />
        <Button click={()=>{set()}} customClass="bg-sky-400 hover:ng-sky-500 px-2 rounded-r-md" type="button" text="filtrar" />
    </div>)
}
