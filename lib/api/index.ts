"use server";

import { Customer } from "@prisma/client";
import prisma from "lib/prisma";

export async function getCustomers(): Promise<Customer[]> {
  return await prisma.customer.findMany();
}

export async function saveCustomer(customer: Customer): Promise<Customer> {
  return await prisma.customer.create({ data: customer });
}

export async function deleteCustomer(customerId: string): Promise<void> {
  await prisma.customer.delete({ where: { id: customerId } });
}
