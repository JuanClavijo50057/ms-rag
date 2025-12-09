import axios from "axios";
import { Request, Response } from "express";

export const ragChat = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const sessionId = `user-${userId}`;

    const n8nResponse = await axios.post(
      process.env.N8N_WEBHOOK_URL!,
      { 
        question,
        sessionId
      }
    );

    return res.json({
      answer: n8nResponse.data.output,
    });

  } catch (error) {
    console.error("Error en RAG:", error);
    return res.status(500).json({ message: "Error en el microservicio RAG" });
  }
};