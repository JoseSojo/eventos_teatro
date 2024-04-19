
interface Props {
    text: string,
    customClass: string
}

export default function Title ({text, customClass}: Props) {

    return <h1 className={customClass}>{text}</h1>;
}

