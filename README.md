# orgainc-shop-api
[Live link](https://adorable-rugelach-159011.netlify.app/)

## Project Description

This is an organic e-commerce web application built with React.js, Express.js, Mongoose, Stripe, Nodemailer, JSON Web Tokens (JWT), and Bcrypt.js. It provides a platform for users to browse, search, and purchase organic products. Admins can manage products and view analytics. Users can sign up, log in, reset their passwords, search products by category, add products to their cart, and place orders using the Stripe payment gateway.

## Features

- User Registration: Users can create an account by providing their details.
- User Authentication: Secure user authentication using JWT and Bcrypt.js.
- Password Reset: Users can request a password reset and receive an email with a reset link.
- Product Search: Users can search for products by category.
- Shopping Cart: Users can add products to their cart.
- Checkout and Payment: Users can place orders using the Stripe payment gateway.
- Admin Panel: Admins can add, update, and delete products, as well as view product analytics.

## Technologies
- Express.js: Back-end framework.
- Mongoose: MongoDB object modeling.
- Stripe: Payment gateway integration.
- Nodemailer: Sending password reset emails.
- JSON Web Tokens (JWT): Secure authentication.
- Bcrypt.js: Password hashing and verification.

## Installation Process

1. **Clone the Repository:**

```bash
git clone https://github.com/Jobayer98/orgainc-shop-api.git
```


2. **Install Dependencies & Run:**

```bash
cd organic-shop-api
npm install
npm run dev
```

3. **Set Environment Variables:**

Create a `.env` file in the root directory and configure the following environment variables:

```bash
JWT_SECRET=your-jwt-secret
SESSION_SECRET=mysessionsecret
MONGO_URI=your-mongodb-uri

SMPT_HOST=your-host-name
SMPT_PORT=your-smpt-port
SMPT_USER=your-smpt-user
SMPT_PASS=your-smpt-pass

STRIPE_SECRET_KEY=your-stripe-secret-key

CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

## Author

- Author: Jobayer98
- GitHub: [Your GitHub Profile](https://github.com/Jobayer98)

