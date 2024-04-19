import { useState } from "react";
import { GetUserStorage } from "../../services/user.service";
import Image from "../atoms/Image";
import Paragrap from "../atoms/Paragrap";
import Subtitle from "../atoms/Subtitle";
import GlobalLayout from "../layout/GlobalLayout";
import Button from "../atoms/Button";
import UpdateData from "../organims/UpdateData";
import UpdatePassword from "../organims/UpdatePassword";
import UpdateAvatar from "../organims/UpdateAvatar";

type SECTIONS = `DATA` | `PASSWORD` | `AVATAR`;

interface Props {}
export default function ProfileTemplate({}: Props) {  
    const user = GetUserStorage();
    const [section, setSection] = useState<SECTIONS>(`DATA`);

    return (
        <GlobalLayout>
            <div className="grid w-full place-items-center px-5 gap-5">
                <div className="relative grid place-items-center w-full h-[200px]"> 
                    <div className="relative shadow-lg bg-white grid grid-cols-[auto_1fr] rounded-md p-5 w-[80%] lg:w-[50%]">
                        <Image 
                            alt="profile image" 
                            customClass="shadow-md bg-gray-400 shadow-gray-700 relative -translate-x-[100px] rounded-full w-[150px] h-[150px]" 
                            path={`${user ? user.photo : ``}`} 
                            />
                        <div className="-translate-x-[50px]">
                            <Subtitle customClass="text-2xl font-light text-gray-600" text={`@${user?.username}`} />
                            <Paragrap customClass="text-lg font-light text-gray-400" text={`${user?.rol}`} />
                            <Paragrap customClass="text-md font-bold text-gray-400 mt-5" text={`creado: ${user?.create_at}`} />
                            <Paragrap customClass="text-md font-bold text-gray-400" text={`actualizado: ${user?.update_at}`} />
                        </div>
                    </div>
                </div>
                <div className="grid w-full grid-cols-1 place-items-start lg:grid-cols-3 gap-5">
                    <div className="bg-white shadow-md rounded-md pb-3 w-full">
                        <Button click={()=> setSection(`DATA`)} customClass="py-3 w-full rounded-t-lg hover:bg-gray-200 text-sm font-bold" text="Actualizar Datos" type="button" />
                        { section == `DATA` && <UpdateData /> }
                    </div>
                    
                    <div className="bg-white shadow-md rounded-md pb-3 w-full">
                        <Button click={()=> setSection(`PASSWORD`)} customClass="py-3 w-full rounded-t-lg hover:bg-gray-200 text-sm font-bold" text="Actualizar Contraseña" type="button" />
                        { section == `PASSWORD`&& <UpdatePassword /> }
                    </div>
                    
                    <div className="bg-white shadow-md rounded-md pb-3 w-full">
                        <Button click={()=> setSection(`AVATAR`)} customClass="py-3 w-full rounded-t-lg hover:bg-gray-200 text-sm font-bold" text="Actualizar Avatar" type="button" />
                        { section == `AVATAR`&& <UpdateAvatar /> }
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}
 