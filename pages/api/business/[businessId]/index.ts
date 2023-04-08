import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const businessId = Number(req.query.businessId);

  switch (req.method) {
    case 'GET':
      const business = await prisma.business.findUnique({
        where: { id: businessId },
      });

      res.status(200).json({ data: business });
      break;
    case 'DELETE':
      const deletedBusiness = await prisma.business.delete({
        where: { id: businessId },
      });

      res.status(202).json({ data: deletedBusiness });
      break;
    case 'PATCH':
      const { name, description } = req.body;
      let data: { name?: string; description?: string } = {};
      if (name) data['name'] = name;
      if (description) data['description'] = description;

      const updatedBusiness = await prisma.business.update({
        where: { id: businessId },
        data,
      });

      res.status(200).json({ data: updatedBusiness });
      break;

    default:
      res
        .status(400)
        .json({ error: `unsupported request method: ${req.method}` });
      break;
  }
}
