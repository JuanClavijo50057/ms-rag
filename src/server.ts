import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ragRoutes from "./routes/rag.routes";
import { securityMiddleware } from "./middleware/security";
import { corsOptions } from "./config/cors.config";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Todas las rutas de rag requieren seguridad
app.use("/rag", securityMiddleware, ragRoutes);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`ms-rag running on port ${PORT}`);
});