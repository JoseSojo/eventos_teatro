import { useLocation } from "wouter";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Title from "../atoms/Title";

export default function IndexTemplate () {

    const [location, setLocation] = useLocation();

    if(location == `/login`) console.log(1);

    return (
        <div className="bg-gray-500 min-h-screen grid place-items-center">
            <Image alt="fondo teatro" customClass="absolute z-0 h-full w-full object-cover" path="/teatro.jpg" />

            <div className="z-10 w-full bg-white rounded-[20px] p-5 lg:w-[50%] grid place-items-center gap-3">
                    <Title customClass="text-3xl text-center text-extrabold text-gray-800" text="Teatro Simón Bolivar" />

                    <Button click={()=>setLocation(`/event/new`)} customClass="bg-green-400 hover:bg-green-500 py-3 px-5 rounded-md" type="button" text="Registrar un evento" />
                    <Button click={()=>setLocation(`/login`)} customClass="bg-green-400 py-3 px-5 rounded-md" type="button" text="Personal del teatro" />
            </div>
        </div>
    );
}
