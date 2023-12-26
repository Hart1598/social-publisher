import { getUserByIdSchema, getUserListSchema } from "@app/validators";
import { createZodDto } from "nestjs-zod";

export class GetUserByIdDto extends createZodDto(getUserByIdSchema) {}

export class GetUserListDto extends createZodDto(getUserListSchema) {}
