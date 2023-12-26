import { z } from 'nestjs-zod/z';

export const stringToNumber = z.string().transform(Number)
