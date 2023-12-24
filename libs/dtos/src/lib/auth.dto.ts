import { singInSchema, singUpSchema } from "@app/validators";
import { createZodDto } from "nestjs-zod";

export class SignInDto extends createZodDto(singInSchema) {}

export class SignUpDto extends createZodDto(singUpSchema) {}
