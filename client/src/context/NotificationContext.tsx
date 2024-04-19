import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

type NOTI = string | null;

interface NotificationContextInterface {
    noti: NOTI
    setNoti: Dispatch<SetStateAction<NOTI>>
}

const DefaultNoti: NotificationContextInterface = {
    noti: null,
    setNoti: () => {}
}

export const NotificationContext = createContext<NotificationContextInterface>(DefaultNoti);

export const NotificationProvider = ({children}: {children: ReactNode}) => {
    
    const [notification, setNotification] = useState<NOTI>(null);

    return (
        <NotificationContext.Provider value={{
            noti: notification,
            setNoti: setNotification
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext);