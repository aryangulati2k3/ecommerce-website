import Link from "next/link";
import Image from "next/image";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} passHref>
            <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-full flex flex-col justify-between">
                <div>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl line-clamp-2">
                            {product.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">${product.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <div className="w-full h-20 sm:h-48 md:h-50 lg:h-64 relative">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="rounded object-contain"
                            />
                        </div>
                    </CardContent>
                </div>
                <CardFooter className="mt-auto">
                    <Button variant={"outline"} className="w-full py-2">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
