import { useState } from "react";
// import { GetUserStorage } from "../../services/user.service";
import Subtitle from "../atoms/Subtitle";
import GlobalLayout from "../layout/GlobalLayout";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import CreateUser from "../organims/CreateUser";
import ListUser from "../organims/ListUser";

type SECTIONS = `LIST` | `CREATE`;

interface Props {}
export default function UserTemplate({}: Props) {  
    // const user = GetUserStorage();
    const [section, setSection] = useState<SECTIONS>(`LIST`);

    return (
        <GlobalLayout>
            <div className="grid grid-rows-[auto_1fr] w-full h-full px-5 gap-5">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <Subtitle customClass="text-3xl font-light" text="Usuarios" />
                    <Button 
                        click={()=>setSection(section == "CREATE" ? `LIST` : `CREATE`)} 
                        customClass="max-w-[120px] flex justify-center items-centers rounded-md py-3 px-5 gap-3 bg-indigo-400 hover:bg-indigo-500" 
                        content={<>{
                            section == `LIST`
                            ? <>
                                <Image alt="" customClass="w-5 h-5" path="/add-user.svg" /> 
                                crear
                            </>
                            : <>
                                <Image alt="" customClass="w-5 h-5" path="/user.svg" /> 
                                volver
                            </>
                        }</>} 
                        type="button" 
                        />
                </div>
                {
                    section == "CREATE"
                    ? <CreateUser close={() => setSection(`LIST`)} />
                    : <ListUser />
                }
            </div>
        </GlobalLayout>
    )
}
 