"use strict";

// Definition of extra methods for localStorage.
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
};

// Initial localStorage state.
const keepLoggedIn = localStorage.getObj('keepLoggedIn');

if (keepLoggedIn === null) {
    localStorage.setObj('keepLoggedIn', true);
} else {
    if (keepLoggedIn === false) {
        localStorage.setItem('currentUserId',  null);
        localStorage.setObj('keepLoggedIn', true);
    }
}

if (!localStorage.getObj('users')) {
    localStorage.setObj('users', []);
}

if (!localStorage.getItem('currentUserId') || !localStorage.getObj('users').length) {
    localStorage.setItem('currentUserId', null);
}

if (!localStorage.getObj('services')) {
    localStorage.setObj(
        'services',
        [{
            'id': 1,
            'title': 'Haircut',
            'price': 35.00,
            'imagePath': 'public/img/services/haircut.jpg',
        },
        {
            'id': 2,
            'title': 'Beard Service',
            'price': 20.00,
            'imagePath': 'public/img/services/beardService.jpg',
        },
        {
            'id': 3,
            'title': 'Buzz Cut',
            'price': 20.00,
            'imagePath': 'public/img/services/buzzCut.jpg',
        },
        {
            'id': 4,
            'title': 'Restyle',
            'price': 40.00,
            'imagePath': 'public/img/services/restyle.jpg',
        },
        {
            'id': 5,
            'title': 'Shave',
            'price': 20.00,
            'imagePath': 'public/img/services/shave.jpg',
        },
        {
            'id': 6,
            'title': 'Haircut + Shave',
            'price': 55.00,
            'imagePath': 'public/img/services/haircutShave.jpg',
        }]
    );
}