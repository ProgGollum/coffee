export interface IProduct {
    id: string;
    name: string;
    slug: string;
    thumbnail: {
        url: string;
        alt: string;
    };
    pricing: {
        priceRange: {
            start: {
                gross: {
                    currency: string;
                    amount: number;
                };
            };
        };
    };
    descriptionJson: string;
}