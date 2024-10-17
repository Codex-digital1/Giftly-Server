# Giftly Server

## Description
**Giftly Server** is the backend of the Giftly platform, meticulously crafted to manage gifts, send real-time notifications, support live chat, track delivery status, schedule deliveries, handle reviews and ratings, and process payments securely. It ensures smooth operations and real-time communication, providing users with a seamless and reliable gift-giving experience.

## Key Features
- 🔔 **Real-Time Notifications:** Get notified immediately when your gift reaches the recipient.
- 💬 **Live Chat Support:** Receive instant assistance for your shopping queries in real-time.
- 📦 **Track Gift Delivery Status:** Easily track your gift's journey and receive updates on delivery status.
- 🔒 **Secure Payment Gateway:** Enjoy a safe checkout experience with multiple payment options.
- 📝 **Wishlist & Cart Functionality:** Save gift ideas in a wishlist and manage your cart for easy checkout.
- ⭐ **Review and Rating Feature:** Leave reviews and ratings to help others find the perfect gift.
- 📅 **Scheduled Delivery:** Plan gift deliveries for special occasions, ensuring they arrive on time.
- 💰 **Discount Codes and Promotions:** Use special discounts during checkout for great savings on your gifts.

## 🛠 Technologies Used
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** React, TypeScript, Tailwind CSS
- **Third-party Services:** Firebase (authentication), SSLCommerz (payment processing), Cloudinary (image uploads), Socket.io (real-time communication)

## ⚙️ Installation Guide
To set up the **Giftly Server** on your local machine, follow these steps:

### Step 1: Clone the Server Repository
```bash
git clone https://github.com/Codex-digital1/Giftly-Server.git
```

### Step 2: Navigate to the Server Directory
```bash
cd Giftly-Server
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start the Server
```bash
npm run dev
```

## Environment Variables
Make sure to set up your environment variables for connecting to the database and integrating with third-party services. Create a `.env` file with the following structure:
```
MONGO_URI=your_mongo_db_connection_string
FIREBASE_API_KEY=your_firebase_api_key
CLOUDINARY_URL=your_cloudinary_url
SSL_COMMERCE_KEY=your_ssl_commerce_key
```
For client setup and instructions, please refer to the : 👉 [Giftly client repository](https://github.com/Codex-digital1/Giftly)
 
