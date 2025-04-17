export type Product = {
    id: number;
    title: string;
    slug: string;
    image_url: string[];
    price: number;
    hero_image: string;
    category: number;
    max_quantity: number;
};

// create product type


export type CategoriesWithProducts = {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    created_at: string;
    products: Product[];
};


// create CategoriesWithProducts type that uses the Product type in products 

export type CategoriesWithProductResponse = CategoriesWithProducts[];

// export CategoriesWithProductResponse which is a array of all CategoriesWithProducts[]