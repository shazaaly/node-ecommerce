# Node-ecommerce
Node.js E-Commerce App with REST API | MongoDB | Advanced Authentication
Sure, here's the README.md content as a continuous text block for easy copying:



Overview
This is a Node.js e-commerce project that allows users to browse products, add them to their cart, and complete purchases.
Project is still under construction, supposed  to end by 30 March 2024.
Stay tuned for updates.

Features
- User Authentication: Users can sign up, log in, and log out securely.
- Product Catalog: Users can view a list of products with details such as name, price, and description.
- Shopping Cart: Users can add products to their shopping cart and manage the quantities.
- Checkout Process: Users can complete purchases by entering shipping and payment information.
- Order History: Users can view their past orders.
- Admin Panel: Administrators can add, edit, and delete products.
Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT for authentication

Getting Started
1. Clone the repository:
   ```
   git clone [https://github.com/your-username/node-ecommerce-project.git](https://github.com/shazaaly/node-ecommerce)
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Define the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/ecommerce
     SESSION_SECRET=your_session_secret
     ```
4. Run the application:
   ```
   npm start
   ```
5. Access the application in your browser at `http://localhost:3000`

Folder Structure
- `config/`: Configuration files (e.g., database connection, authentication strategies).
- `models/`: Mongoose models for database schema.
- `routes/`: Express routes for different parts of the application.
- `views/`: Handlebars templates for rendering HTML.
- `public/`: Static assets (e.g., CSS, JavaScript).
- `controllers/`: Controllers for handling business logic.
- `middlewares/`: Custom middleware functions.
- `utils/`: Utility functions.

Contributing
Contributions are welcome!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
