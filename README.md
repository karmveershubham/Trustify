# Trustify  [Live Preview](https://trustify-psi.vercel.app/)

Trustify is an innovative platform designed to build trust among users by leveraging the concept of contacts of contacts. This trust-based mechanism ensures that users can buy products from interlinked personnel with confidence, knowing the product's authenticity is upheld by trusted relationships.

---

## Features
- **Trust Through Connections:** Users are represented as nodes in a Neo4j database, and their relationships (contacts of contacts) form links that foster trust.
- **Verified Transactions:** The trust network ensures that products are delivered as promised.
- **User-Friendly Interface:** Powered by Next.js, the frontend offers a seamless user experience.
- **Robust Backend:** The Express-based backend ensures scalability and reliability.

---

## Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** CSS/SCSS/TailwindCSS 
- **State Management:**  Redux 

### Backend
- **Framework:** [Express.js](https://expressjs.com/)
- **Authentication:** Google Auth & Passport
- **API Design:** RESTful APIs

### Database
- **Graph Database:** [Neo4j](https://neo4j.com/)
  - Users are represented as nodes.
  - Connections between users represent relationships (contacts of contacts).

---

## How Trustify Works
1. **User Registration and Login:** Users sign up and log in to the platform.
2. **Building Connections:** Users add contacts, which automatically link to the contacts of their contacts, creating a web of trust.
3. **Product Listings:** Users can list products for sale, visible to their trusted network.
4. **Purchases:** Buyers can purchase items from trusted sellers within the network, ensuring authenticity and reliability.
5. **Graph Representation:** Neo4j visualizes these connections, making it easy to understand the trust network.

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or later)
- **Neo4j Database**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/trustify.git
   cd trustify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Add the required variables for Neo4j and the backend server.
     ```env
     NEO4J_URI=bolt://localhost:7687
     NEO4J_USER=neo4j
     NEO4J_PASSWORD=yourpassword
     JWT_SECRET=your_jwt_secret
     ```

4. Start the Neo4j database server.

5. Run the development servers:
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - Backend:
     ```bash
     cd backend
     npm run start
     ```

6. Access the application:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Future Enhancements
- Integration with blockchain for additional security.
- Machine learning algorithms to predict trust scores.
- Advanced analytics dashboards.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For questions or feedback, please reach out to us at support@trustify.com.

---

Thank you for choosing Trustify! Together, we build trust.

