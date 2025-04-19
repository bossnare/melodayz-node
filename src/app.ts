import express from "express";
import connectDB from "./config/db.js"; // mila an'io raha misaraka front-back
import dotenv from "dotenv";
import cors from "cors"; // mila an'io raha misaraka front-back
import ping from "./routes/ping.route.js";
import verifyJWT from "./middlewares/jwt.middleware.js";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger.js";
import chicken from "./routes/chicken.route.js";

dotenv.config();

const app = express();
// Setup Swagger documentation
const specs = swaggerJsDoc(swaggerOptions); 
// Connect to MongoDB
connectDB();
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // 🔥 Mila an'io raha misaraka front-back
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Serve Swagger UI at /api-docs
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message:
        "Hello World! My Server is Running Smoothly. Welcome to the API!",
    });
});

app.use(verifyJWT); // Middleware to verify JWT token
app.use("/api", ping);
app.use("/api/chicken", chicken);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the app for testing purposes
export default app;
