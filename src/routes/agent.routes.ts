import { Router } from "express";
import { agentChat } from "../controllers/agent.controller";

const router = Router();

router.post("/agent", agentChat);

export default router;
