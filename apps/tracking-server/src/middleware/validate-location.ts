import { locationSchema } from "../validation/location.schema";

export function validateLocation(data: unknown) {
  return locationSchema.safeParse(data);
}