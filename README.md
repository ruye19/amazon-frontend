

# Amazon Clone Project

This is a full-stack Amazon clone project built using React for the front end and Node.js/Express for the back end. The project aims to replicate the core functionalities of the Amazon website, including user authentication, product listings, shopping cart, and order management.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Product Listings
- Product Search
- Shopping Cart
- Order Management
- Responsive Design

## Technologies Used

### Front End
- React
- Redux (for state management)
- React Router (for navigation)
- Axios (for API calls)
- CSS/SCSS (for styling)

### Back End
- Node.js
- Express
- MongoDB (for database)
- Mongoose (for MongoDB object modeling)
- JWT (for authentication)
- bcrypt (for password hashing)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/amazon-clone.git
    cd amazon-clone
    ```

2. Install dependencies for both front end and back end:
    ```bash
    # For front end
    cd client
    npm install

    # For back end
    cd ../server
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `server` directory and add the following:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the development server:
    ```bash
    # For front end
    cd client
    npm start

    # For back end
    cd ../server
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to view the front end.
2. Use the application to sign up, browse products, add items to the cart, and place orders.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
