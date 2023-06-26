import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Pratham',
            email: 'admin@email.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Sparsh',
            email: 'Sparsh@email.com',
            password: bcrypt.hashSync('123456'),
        }
    ],
    products: [
        {
            name: 'Samsung galaxy S20+',
            display: 6.7,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s20-plus.jpg',
            storage: '12gb/256gb',
            price: 54999,
            rating: 4.0,
            reviews: 20,
            Stock: 3
        },
        {
            name: 'Samsung galaxy S20',
            display: 5.9,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s20-.jpg',
            storage: '8gb/256gb',
            price: 44999,
            rating: 4.1,
            reviews: 30,
            Stock: 2
        },
        {
            name: 'Samsung galaxy S9+',
            display: 5.8,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s9-plus-blue.jpg',
            storage: '8gb/128',
            price: 34999,
            rating: 4.6,
            reviews: 40,
            Stock: 5
        },
        {
            name: 'Samsung galaxy S8',
            display: 5.8,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s9-plus-blue.jpg',
            storage: '8gb/128',
            price: 34999,
            rating: 4.6,
            reviews: 40,
            Stock: 0
        },
        {
            name: 'Samsung galaxy S7 edge',
            display: 5.8,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s9-plus-blue.jpg',
            storage: '8gb/128',
            price: 34999,
            rating: 4.6,
            reviews: 40,
            Stock: 7
        },
        {
            name: 'Samsung galaxy S6 edge',
            display: 5.8,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s9-plus-blue.jpg',
            storage: '8gb/128',
            price: 34999,
            rating: 4.6,
            reviews: 40,
            Stock: 8
        },
        {
            name: 'Samsung galaxy S6',
            display: 5.8,
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s9-plus-blue.jpg',
            storage: '8gb/128',
            price: 34999,
            rating: 4.6,
            reviews: 40,
            Stock: 11
        }
    ]
};

export default data;