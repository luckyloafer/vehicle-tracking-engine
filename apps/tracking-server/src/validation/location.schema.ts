import { z } from "zod";

export const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),

  longitude: z.number().min(-180).max(180),

  speed: z.number().min(0).max(350),

  heading: z.number().min(0).max(360),

  timestamp: z.number(),
});

export type LocationDto = z.infer<typeof locationSchema>;