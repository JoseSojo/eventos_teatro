
interface Props {
    text: string,
    customClass: string
}

export default function Paragrap ({text, customClass}: Props) {

    return <p className={customClass}>{text}</p>;
}

