import { Link } from "wouter";

interface Props {
    path: string,
    customClass: string
}

export default function SidebarItem({}: Props) {

    return (
        <Link href="/">
            <a></a>
        </Link>
    )
}
