import { useEffect } from "react";
import { useNotification } from "../../context/NotificationContext"

interface Props {}

export default function Notification({}: Props) {

    const noti = useNotification();

    useEffect(() => {
        setTimeout(() => {
            noti.setNoti(null);
        }, 2000);
    }, [])

    return (
        <div className="">
            { 
                noti?.noti && 
                <div className="left-10 bottom-10 absolute max-w-lg w-[250px] shadow bg-white px-3 py-2 rounded-md">
                    {noti.noti}
                </div>
            }
        </div>
    )
}
