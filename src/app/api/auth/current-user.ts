import { NextApiRequest, NextApiResponse } from 'next';
import { getDataFromUser } from '@/app/helpers/getuserdata';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = getDataFromUser(req);
    res.status(200).json(userData);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}