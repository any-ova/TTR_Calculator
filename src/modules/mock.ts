import type {Book, CartSummary} from '../lib/types';
import book1 from '../assets/book1.png'; // TODO: поменять картинки книг на настоящие
import book2 from '../assets/book2.png';
import book3 from '../assets/book3.png';

export const MOCK_BOOKS: Book[] = [
    {
        id: 1,
        Title: "Война и мир",
        Author: "Лев Толстой",
        Description: "Эпопея о жизни русского общества в эпоху войн и перемен.",
        Words: 560000,
        UniqueWords: 21000,
        ImageURL: book1,
    },
    {
        id: 2,
        Title: "Преступление и наказание",
        Author: "Фёдор Достоевский",
        Description: "Психологический роман о морали, вине и искуплении.",
        Words: 210000,
        UniqueWords: 12000,
        ImageURL: book2,
    },
    {
        id: 3,
        Title: "Мастер и Маргарита",
        Author: "Михаил Булгаков",
        Description: "Философский роман о добре, зле, любви и творчестве.",
        Words: 180000,
        UniqueWords: 10500,
        ImageURL: book3,
    },
];

export const MOCK_CART: CartSummary = {
    order_id: "-1",
    count: 0,
};