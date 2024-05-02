import { Dispatch, SetStateAction } from "react";

interface Props {
    changeMonth: Dispatch<SetStateAction<string>>
}

export default function SelectMonth ({changeMonth}: Props) {

    return (
        <select onChange={(e)=> changeMonth(e.target.value)} defaultValue={`ENERO`}>
            <option selected value="ENERO">selecciona una opcion</option>
            <option selected value="Enero">Enero</option>
            <option selected value="Febrero">Febrero</option>
            <option selected value="Marzo">Marzo</option>
            <option selected value="Abril">Abril</option>
            <option selected value="Mayo">Mayo</option>
            <option selected value="Junio">Junio</option>
            <option selected value="Julio">Julio</option>
            <option selected value="Agosto">Agosto</option>
            <option selected value="Septiembre">Septiembre</option>
            <option selected value="Octubre">Octubre</option>
            <option selected value="Noviembre">Noviembre</option>
            <option selected value="Diciembre">Diciembre</option>
        </select>
    )
}
