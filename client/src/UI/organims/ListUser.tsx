import { useEffect, useState } from "react"
import { DataUser } from "../../types/user.interface";
import { DeleteUserById, GetAllUser } from "../../services/superadmin.service";
import Paragrap from "../atoms/Paragrap";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Subtitle from "../atoms/Subtitle";
import { BACKEND } from "../../constants";

interface Props {}

export default function ListUser({}: Props) {

    const [users, setUsers] = useState<DataUser[] | null>(null);
    const [error, setError] = useState<string | null>();
    const [load, setLoad] = useState(true);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState<DataUser | null>(null);
    const [deleteUser, setDeleteUser] = useState(false);

    useEffect(() => {
        const ExecuteRequets = async () => {
            setLoad(true);
            const response = await GetAllUser();
            if(response == false) return setError(`list.global`);
            setUsers(response);
            setError(null);
            return setLoad(false);
        }
        ExecuteRequets();
    }, [update])

    return (
        <div>
            { error != null && load == false && <Paragrap customClass="text-center mt-5 text-xl text-gray-700 font-light" text="usuarios no disponibles temporalmente..." /> }
            { error == null && load && <Paragrap customClass="text-center mt-5 text-xl text-gray-700 font-light" text="cargando usuarios..." /> }
            { 
                error == null && load == false && users !== null &&
                <>
                {
                    show
                    ? <div>
                        <div className="relative grid place-items-center w-full h-[200px]"> 
                            <div className="relative shadow-lg bg-white grid grid-cols-[auto_1fr] rounded-md p-5 w-[80%] lg:w-[50%]">
                            {
                                deleteUser
                                ? <>
                                
                                <div
                                    className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center border border-gray-800 shadow-lg rounded-2xl"
                                    >
                                    <div className="">
                                        <div className="text-center p-3 flex-auto justify-center">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                clip-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                fill-rule="evenodd"
                                                ></path>
                                            </svg>
                                            <Subtitle customClass="text-xl font-bold py-4 text-gray-800" text="confirmar" />
                                            <Paragrap customClass="" text={`seguro que desea eliminar a "${show.username}"`} />
                                        </div>
                                        <div className="p-2 mt-2 text-center space-x-1 md:block">
                                            <Button 
                                                click={()=> setDeleteUser(false)} 
                                                customClass="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300" 
                                                type="button" 
                                                text="cancelar"
                                                />
                                            <Button 
                                                click={()=> {
                                                    setUpdate(!update);
                                                    DeleteUserById({ id:show._id });
                                                    setShow(null);
                                                }} 
                                                customClass="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300" 
                                                type="button" 
                                                text="confirmar"
                                                />
                                        </div>
                                    </div>
                                </div>
                                </>
                                : <><Image 
                                    alt="profile image" 
                                    customClass="shadow-md bg-gray-400 shadow-gray-700 relative -translate-x-[100px] rounded-full w-[150px] h-[150px]" 
                                    path={`${BACKEND}/public/${show.photo}`} 
                                    />
                                    <div className="-translate-x-[50px]">
                                        <Subtitle customClass="text-2xl font-light text-gray-600" text={`@${show.username}`} />
                                        <Paragrap customClass="text-lg font-light text-gray-400" text={`${show.rol}`} />
                                        <Paragrap customClass="text-md font-bold text-gray-400 mt-5" text={`creado: ${show.create_at}`} />
                                        <Paragrap customClass="text-md font-bold text-gray-400" text={`actualizado: ${show.update_at}`} />
                                        <Button click={()=>setShow(null)} customClass="mx-2 mt-5 inline-flex items-center px-4 py-2 transition ease-in-out delay-75 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 bg-sky-500 hover:bg-sky-600" type="button" text="volver" />
                                        <Button
                                            click={()=>{
                                                // DeleteUserById({id:show._id});
                                                setDeleteUser(true);
                                                // setShow(null);
                                                // setUpdate(!update);
                                            }}
                                            customClass="mx-2 mt-5 inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                            type="button"
                                            text="eliminar"
                                        />
    
                                    </div></>
                                }                            
                            </div>
                        </div>
                    </div>
                    : <>{
                        users.length <= 0 
                        ? <Paragrap customClass="text-center mt-5 text-xl text-gray-700 font-light" text="No tienes usuarios" />
                        : <div>
                            <div className="grid grid-cols-4 border place-items-center">
                                <span className="py-2">rol</span>
                                <span className="py-2">usuario</span>
                                <span className="py-2">correo</span>
                                <span className="py-2"></span>
                            </div>
                            {
                                users.map((user) => (
                                    <div key={user._id} className="grid grid-cols-4 border place-items-center">
                                        <span className="py-2 text-gray-500">{user.rol}</span>
                                        <span className="py-2 text-gray-500">{user.username}</span>
                                        <span className="py-2 text-gray-500">{user.email}</span>
                                        <span className="py-2">
                                            <Button 
                                                click={()=>setShow(user)}
                                                customClass="inline-flex items-center px-4 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                                                type="button"
                                                text="ver"
                                            />
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    }</>
                }   
                </>
            }
        </div>
    )
}
