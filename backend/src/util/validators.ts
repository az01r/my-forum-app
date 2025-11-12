import { body } from 'express-validator';

export const signupValidation = [
    body('nickname')
        .trim()
        .notEmpty()
        .withMessage('Nickname is required.'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
];

export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
];

export const createTopicValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Please enter a valid title.'),
];