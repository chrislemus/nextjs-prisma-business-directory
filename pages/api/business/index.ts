import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const businesses = await prisma.business.findMany();
      res.status(200).json({ data: businesses });
      break;
    case 'POST':
      const { name, description } = req.body;
      const newBusiness = await prisma.business.create({
        data: { name, description },
      });

      res.status(200).json({ data: newBusiness });
      break;
    default:
      res
        .status(400)
        .json({ error: `unsupported request method: ${req.method}` });
      break;
  }
}
