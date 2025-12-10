import axios from "axios";
import { Request, Response } from "express";

export const agentChat = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const sessionId = `user-${userId}`;

    const n8nResponse = await axios.post(
      process.env.N8N_WEBHOOK_AGENT_URL!, // OJO: este es diferente al del RAG
      {
        question,
        sessionId
      }
    );

    return res.json({
      output: n8nResponse.data.output,
    });

  } catch (error) {
    console.error("Error en Agent:", error);
    return res.status(500).json({ message: "Error en el microservicio Agent" });
  }
};
