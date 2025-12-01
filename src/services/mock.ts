export const MOCK_BOOKS = [
    {
        id: '1',
        title: 'Классическая лирика',
        author: 'Иван Иванов',
        description: 'Анализ частотности слов в классических романах.',
        unique_words: 12345,
        words: 45678,
        image_url: '/img/default-service.png',
    },
    {
        id: '2',
        title: 'Современная проза',
        author: 'Мария Петрова',
        description: 'Статистика по современным авторам.',
        unique_words: 9876,
        words: 30000,
        image_url: '/img/default-service.png',
    },
    {
        id: '3',
        title: 'Короткие рассказы',
        author: 'Сергей Сергеев',
        description: 'Набор рассказов и TTR вычисления.',
        unique_words: 5432,
        words: 20000,
        image_url: '/img/default-service.png',
    },
];

export const MOCK_CART = {
    cartCount: 0,
    draftId: '1',
};

export const MOCK_ORDER = {
    ID: '1',
    Title: 'Моя заявка',
    TotalWords: 75678,
    TotalUniqueWords: 27653,
    TTR: 12.3,
    OrderBooks: [
        {
            Book: {
                ID: '1',
                Title: 'Классическая лирика',
                Author: 'Иван Иванов',
                Description: 'Анализ частотности слов в классических романах.',
                ImageURL: '/img/default-service.png',
                UniqueWords: 12345,
                Words: 45678,
            },
            Comment: 'Нужна в ТЗ',
        },
        {
            Book: {
                ID: '2',
                Title: 'Современная проза',
                Author: 'Мария Петрова',
                Description: 'Статистика по современным авторам.',
                ImageURL: '/img/default-service.png',
                UniqueWords: 9876,
                Words: 30000,
            },
            Comment: 'Пожелание: проверить обороты',
        },
    ],
};