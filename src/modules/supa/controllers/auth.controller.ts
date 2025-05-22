import { Request, Response } from 'express';
import { supabase } from '@shared/config/supabaseClient';
import * as jwt from 'jsonwebtoken';

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({message: "Usuario registrado correctamente", data});
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })


  if (error) return res.status(400).json({ error: error.message });

  const isVerified = !!data.user.email_confirmed_at;

  res.status(200).json({
    message: isVerified
    ? "Inicio de sesion exitoso"
    : "Correo no verificado",
    verified: isVerified,
    access_token:data.session?.access_token,
    user: data.user
  })
}

export const loginWithGoogle = async (_: Request, res: Response) => {
  const redirectTo = process.env.GOOGLE_REDIRECT_URL;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    }
  })

  if (error) return res.status(400).json({ error: error.message });

  //Redireccionar al usuario a la pagina de Google
  res.redirect(data.url);

}

export const validateSession = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET!) as any;

    if (!SUPABASE_JWT_SECRET) {
      throw new Error("JWT secret is not defined in environment variables");
    }

    res.status(200).json({
      message: "Sesión válida",
      user: {
        id: decoded.sub,
        email: decoded.email,
        email_verified: !!decoded.email_confirmed_at,
      },
    });
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El correo es requerido"});
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email
  })

  if (error) {
    return res.status(400).json({ error: error.message})
  }

  res.status(200).json({ message: "Correo de verificacion reenviado"})
}

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado"});
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message})
  }

  res.status(200).json({ message: "Sesion cerrada exitosamente"})
}
