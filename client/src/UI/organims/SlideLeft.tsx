import { useLocation } from "wouter";
import LinkTo from "../atoms/LinkTo";
import Image from "../atoms/Image";
import { GetUserStorage } from "../../services/user.service";

interface Props {
    icon: boolean
}

export default function SlideLeft({icon}: Props) {

    const [location] = useLocation();
    const user = GetUserStorage();
    const ROL = `${user?.rol}`;

    const clsItem = "py-3 hover:bg-slate-500 text-center text-md text-white flex w-full px-5 grid";
    const clsItemActive = "py-3 bg-slate-500 text-center text-md text-white flex w-full px-5 grid";

    const clsIco = `w-[16px] h-[20px] m-auto`;

    return (
        <div className="bg-indigo-400 h-full lg:rounded-tr-3xl ">
            
            <div className="">
                <Image alt="logo teatro" customClass="w-full h-auto object-cover" path="/teatro.png" />
            </div>

            {
                icon
                ? <ul className="grid">
                    <LinkTo customClass={`${location == `/dashboard` ? `${clsItemActive}` : `${clsItem}` } rounded-tr-3xl text-center`} path="/dashboard" text={<Image alt="" customClass={clsIco} path="/home.svg" />} />
                    <LinkTo customClass={`${location == `/profile` ? `${clsItemActive}` : `${clsItem}` }`} path="/profile" text={<Image alt="" customClass={clsIco} path="/user.svg" />} />
                    <LinkTo customClass={`${location == `/event` ? `${clsItemActive}` : `${clsItem}` }`} path="/event" text={<Image alt="" customClass={clsIco} path="/desktop.svg" />} />
                    {(ROL == `ADMIN` || ROL == `SUPERADMIN`) && <LinkTo customClass={`${location == `/users` ? `${clsItemActive}` : `${clsItem}` }`} path="/users" text={<Image alt="" customClass={clsIco} path="/groups.svg" />} /> }
                </ul>
                : <ul className="grid">
                    <LinkTo customClass={`rounded-tr-3xl ${location == `/dashboard` ? `${clsItemActive} grid-cols-2` : `${clsItem} grid-cols-2` }`} path="/dashboard" text={<><Image alt="" customClass={clsIco} path="/home.svg" /> inicio</>} />
                    <LinkTo customClass={`${location == `/profile` ? `${clsItemActive} grid-cols-2` : `${clsItem}` } grid-cols-2`} path="/profile" text={<><Image alt="" customClass={clsIco} path="/user.svg" /> perfil</>} />
                    <LinkTo customClass={`${location == `/event` ? `${clsItemActive} grid-cols-2` : `${clsItem}` } grid-cols-2`} path="/event" text={<><Image alt="" customClass={clsIco} path="/desktop.svg" /> eventos</>} />
                    {(ROL == `ADMIN` || ROL == `SUPERADMIN`) && <LinkTo customClass={`${location == `/users` ? `${clsItemActive} grid-cols-2` : `${clsItem} grid-cols-2` }`} path="/users" text={<><Image alt="" customClass={clsIco} path="/groups.svg" /> usuarios</>} /> }
                </ul>
            }
        </div>
    );
}
