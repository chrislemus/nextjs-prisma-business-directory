import { Business } from '@prisma/client';
const _root = 'http://localhost:3000/api';

async function findMany(): Promise<Business[]> {
  const res = await fetch(`${_root}/business`);
  const body = await res.json();
  const business: Business[] = body.data;
  return business;
}

async function findUnique(businessId: number): Promise<Business> {
  const res = await fetch(`${_root}/business/${businessId}`);
  const body = await res.json();
  const business: Business = body.data;
  return business;
}

export const businessApi = { findMany, findUnique };
