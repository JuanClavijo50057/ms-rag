import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// Extender el tipo Request para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const securityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    
    // Decodificar el token JWT
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    req.userId = payload.userId || payload.sub || payload.id || payload._id;

    const thePermission = {
      url: req.originalUrl,
      method: req.method
    };

    console.log('Request:', thePermission);
    console.log('User ID:', req.userId);

    const result = await axios.post(
      `${process.env.MS_SECURITY}/api/public/security/permissions-validation`,
      thePermission,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log('Security response:', result.data);

    if (result.data === true) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error: any) {
    const status = error.response?.status || 403;
    return res.status(status).json({ message: 'Security validation failed' });
  }
};