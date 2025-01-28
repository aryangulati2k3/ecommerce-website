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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <Link href={`/products/${product.id}`} passHref>
            <Card className="w-full h-full flex flex-col justify-between cursor-pointer">
                <div>
                    <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>${product.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <div className="w-[150px] h-[150px] relative">
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
                    <Button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
