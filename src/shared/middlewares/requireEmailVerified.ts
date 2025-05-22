import { Request, Response, NextFunction } from "express";

export const requireEmailVerified = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isVerified =
    req.user?.email_confirmed_at ||
    req.user?.user_metadata?.email_verified === true;

  if (!isVerified) {
    res.status(403).json({
      error: "Correo no verificado. Por favor, verifica tu cuenta para continuar.",
    });
    return;
  }

  next();
};
