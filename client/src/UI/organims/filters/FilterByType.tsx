import { Dispatch, SetStateAction } from "react"

interface Props {
    update: Dispatch<SetStateAction<string>>,
    set: () => void
}

export default function FilterByType ({update, set}: Props) {

    return (
        <select 
            className="bg-white p-2 border rounded-md "
            onChange={(e) => {
                update(e.target.value)
                return set();
            }}
        >
            <option value={`PUBLIC`}>selecciona una opcion</option>
            <option value={`PUBLIC`}>Publicos</option>
            <option value={`PRIVATE`}>Privados</option>
        </select>
    )
}
