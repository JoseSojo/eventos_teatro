import { Dispatch, SetStateAction } from "react"

interface Props {
    update: Dispatch<SetStateAction<string>>,
    set: () => void
}

export default function FilterByStatus ({update, set}: Props) {
    // `RECIBIDO` | `REVISION` | `PROCESADO` | `CULMINADO` | `CANCELADO`
    return (
        <select 
            className="bg-white p-2 border rounded-md "
            onChange={(e) => {
                update(e.target.value)
                return set();
            }}
        >
            <option value={`RECIBIDO`}>selecciona una opcion</option>
            <option value={`RECIBIDO`}>Recividos</option>
            <option value={`REVISION`}>Revision</option>
            <option value={`PROCESADO`}>Procesados</option>
            <option value={`CULMINADO`}>Culminados</option>
            <option value={`CANCELADO`}>Cancelados</option>
        </select>
    )
}
