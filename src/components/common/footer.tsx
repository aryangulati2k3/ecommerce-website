import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-primary-color p-4 text-white">
            <Link href="/" className="text-3xl font-bold">
                Shop
            </Link>
            <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm">
                &copy; {new Date().getFullYear()} Radianz Group. All rights
                reserved.
            </div>
        </footer>
    );
}
