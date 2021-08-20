import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function getProducts(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany();
  res.json({
    products: products,
  });
}

export async function storeProduct(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
    },
  });

  res.json({
    product: product,
  });
}
