import { Dispatch, SetStateAction, useState } from "react"
import SelectMonth from "../../molecules/SelectMonth"
import Button from "../../atoms/Button";

interface Date {
    year: number,
    month: string,
    day: number
}

interface Props {
    update: Dispatch<SetStateAction<Date>>,
    updateVl: Date,
    set: () => void
}

export default function FilterByDate ({update, updateVl, set}: Props) {

    const [monthValue, setMonthValue] = useState(``);
    const [yearValue, setYearValue] = useState(updateVl.year);
    const [dayValue, setDayValue] = useState(updateVl.day);



    return (
        <div className="grid grid-cols-3">
            <input onChange={(e)=>setYearValue(parseInt(e.target.value))} className="flex-1 border outline-none p-2" type="number" value={yearValue} />
            <SelectMonth changeMonth={setMonthValue} />
            <input onChange={(e)=>setDayValue(parseInt(e.target.value))} className="flex-1 border outline-none p-2" type="number" value={dayValue} />
            <Button 
                click={()=>{
                    const obj = {year: yearValue, month: monthValue, day: dayValue};
                    update(obj);
                    return set();
                }} 
                customClass="col-span-3 py-1 bg-sky-400 hover:bg-sky-500 text-gray-800" 
                type="button"
                text="filtrar"
                />
        </div>
    )
}
