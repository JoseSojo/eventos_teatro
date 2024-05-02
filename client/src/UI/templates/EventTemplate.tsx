import Subtitle from "../atoms/Subtitle";
import GlobalLayout from "../layout/GlobalLayout";
import ListEvent from "../organims/ListEvent";

interface Props {}
export default function EventTemplate({}: Props) { 

    return (
        <GlobalLayout>
            <div className="grid grid-rows-[auto_1fr] w-full h-full px-5 gap-5">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <Subtitle customClass="text-3xl font-light" text="Eventos" />
                    
                    
                    <div className="flex gap-3">
                        <span className="bg-gray-400 text-gray-800 border-2 border-gray-500 text-xs font-bold grid place-items-center py-1 px-4 rounded-[11px]">recibido</span>
                        <span className="bg-yellow-400 text-yellow-800 border-2 border-yellow-500 text-xs font-bold grid place-items-center py-1 px-4 rounded-[11px]">rebicion</span>
                        <span className="bg-blue-400 text-blue-800 border-2 border-blue-500 text-xs font-bold grid place-items-center py-1 px-4 rounded-[11px]">procesado</span>
                        <span className="bg-green-400 text-green-800 border-2 border-green-500 text-xs font-bold grid place-items-center py-1 px-4 rounded-[11px]">culminado</span>
                        <span className="bg-red-400 text-red-800 border-2 border-red-500 text-xs font-bold grid place-items-center py-1 px-4 rounded-[11px]">cancelado</span>
                    </div>

                </div>



                <ListEvent />
            </div>
        </GlobalLayout>
    )
}
