import GlobalLayout from "../layout/GlobalLayout";
import CardDashboard from "../molecules/CardDashboard";
import { useEffect, useState } from "react";
import { GetCount } from "../../services/superadmin.service";

interface Props {}

export default function DashboardTemplate({}: Props) { 
    
    const [userCount, setUserCount] = useState(0);
    const [eventCount, setEventsCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const ExecuteRequets = async () => {
            const response = await GetCount();
            console.log(response);
            if(response === false) return setError(`error.global`);
            // setUserCount();
            setUserCount(response.users_count);
            setEventsCount(response.events_count);
            setError(null);
            return setLoad(false);
        }
        ExecuteRequets();
    }, [])

    return (
        <GlobalLayout>
            <div className="h-full p-3">
                { load && <>cargando...</> }
                { error && <>error temporal</> }
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardDashboard description={`${userCount}`} path="/users" title="Usuarios" dark />
                    <CardDashboard description={`${eventCount}`} path="/event" title="Eventos" />
                </div>
            </div>
        </GlobalLayout>
    )
}
