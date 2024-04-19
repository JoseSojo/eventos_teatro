
interface Props {
    text: string,
    customClass: string
}

export default function Subtitle ({text, customClass}: Props) {

    return <h2 className={customClass}>{text}</h2>;
}

