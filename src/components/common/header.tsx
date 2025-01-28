import Link from "next/link";
import Typeahead from "./search";

export default function Header() {
    return (
        <header className="w-full flex flex-col lg:flex-row bg-primary-color justify-between p-4 shadow-xl">
            <Link href="/" className="text-white font-bold text-2xl lg:text-3xl">
                Shop
            </Link>
            <Typeahead />
        </header>
    );
}
