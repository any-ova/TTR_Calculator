export type BookFromApi = {
    id: string | number;
    title?: string;
    author?: string;
    description?: string;
    unique_words?: number;
    words?: number;
    image_name?: string;
    image_url?: string;
};

// Объект в формате, который ожидает верстка (ID, Title, Author, ImageURL, UniqueWords, Words)
export type Book = {
    ID: string;
    Title: string;
    Author?: string;
    Description?: string;
    ImageURL: string;
    UniqueWords?: number;
    Words?: number;
};