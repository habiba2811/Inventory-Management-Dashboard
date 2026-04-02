import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme_secret';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email, and password are required' });
      return;
    }

    const existing = await prisma.account.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const account = await prisma.account.create({
      data: { name, email, password: hashed },
    });

    const token = jwt.sign({ id: account.id, email: account.email, name: account.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: account.id, email: account.email, name: account.name } });
  } catch (error) {
    console.error('Error registering account:', error);
    res.status(500).json({ message: 'Error registering account' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const account = await prisma.account.findUnique({ where: { email } });
    if (!account) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: account.id, email: account.email, name: account.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: account.id, email: account.email, name: account.name } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
