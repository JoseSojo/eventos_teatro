
import LinkTo from "../atoms/LinkTo";
import Paragrap from "../atoms/Paragrap";
import Subtitle from "../atoms/Subtitle";

interface Props {
    dark?: boolean,
    title: string,
    path: string,
    description: string
}

export default function CardDashboard ({dark, title, path, description}: Props) {

    const bgDark = dark ? `bg-gray-900` : `bg-white`;
    const bgDarkAlternate = dark ? `bg-white` : `bg-gray-800`;
    const textDark = dark ? `text-gray-200` : `text-gray-900`;
    const textDarkAlternate = dark ? `text-gray-900` : `text-gray-200`;
    const textDarkOpacity = dark ? `text-gray-300` : `text-gray-700`;

    return (
        <div className={`p-3 rounded-md ${bgDark} grid grid-rows-[auto_1fr] grid-cols-2 gap-y-3 shadow`}>
            <Subtitle customClass={`text-md text-light ${textDarkOpacity}`} text={title} />
            <LinkTo customClass={`rounded-[20px] text-xs text-center font-bold px-5 py-2 ${bgDarkAlternate} ${textDarkAlternate}`} path={path} text={`ir a ${title.toLowerCase()}`} />
            <Paragrap customClass={`${textDark} text-2xl font-light pl-5`} text={description} />
        </div>
    )
}
