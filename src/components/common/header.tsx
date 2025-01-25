import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-primary-color p-4 shadow-xl">
            <Link href="/" className="text-white font-bold text-3xl">
                Shop
            </Link>
        </header>
    );
}
