
interface Props {
    path: string,
    customClass: string,
    alt: string
}

export default function Image({path, customClass, alt}: Props) {

    return (
        <img src={path} className={customClass} alt={alt} />
    );
}
