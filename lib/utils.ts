import { Prisma } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decimalToMoney (price: string | number | Prisma.Decimal) {
  return parseFloat(price.toString())
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
}

export function checkFieldError (field_name: string, errors: any) {
  if (!errors) return false;

  if (!errors[field_name]) return false;

  return errors[field_name][0];
}