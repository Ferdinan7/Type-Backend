import { Request, Response } from 'express';
import { supabase } from '@shared/config/supabaseClient';

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
