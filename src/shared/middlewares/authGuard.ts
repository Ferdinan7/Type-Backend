import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET!;

// Extender la interfaz Request para incluir la propiedad user
interface SupabaseUserJwtPayload {
  sub: string;
  email: string;
  email_confirmed_at: string;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: SupabaseUserJwtPayload
    }
  }
}

if (!SUPABASE_JWT_SECRET) {
  throw new Error('SUPABASE_JWT_SECRET no está definido en las variables de entorno');
}

export const authGuard = (requireEmailVerified: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No autorizado"});
      return
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SUPABASE_JWT_SECRET) as SupabaseUserJwtPayload;

      //Acceder al user
      req.user = decoded;

      //Verificacion opcional de email
/*       if (requireEmailVerified && !decoded.email_confirmed_at) {
        res.status(403).json({ error: "Correo no verificado"});
        return
      } */

      next();
    } catch (error) {
      res.status(401).json({ error: "Token invalido"});
    }
  }
}
