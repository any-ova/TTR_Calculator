export interface Book {
    id: number;
    Title: string;
    Author: string;
    Description: string;
    Words: number;
    UniqueWords: number;
    ImageURL: string;
}

export interface CartSummary {
    order_id: string;
    count: number;
}