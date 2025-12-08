import { Router } from "express";
import { ragChat } from "../controllers/rag.controller";

const router = Router();

// Ruta RAG protegida con permisos
router.post("/chatbot", ragChat);

export default router;
