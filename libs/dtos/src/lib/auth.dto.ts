import { singInSchema, singUpSchema, singUpAdminSchema, refreshTokenSchema, codeSchema } from "@app/validators";
import { createZodDto } from "nestjs-zod";

export class SignInDto extends createZodDto(singInSchema) {}

export class SignUpDto extends createZodDto(singUpSchema) {}

export class SignUpAdminDto extends createZodDto(singUpAdminSchema) {}

export class RefreshTokenDto extends createZodDto(refreshTokenSchema) {};

export class VerifyCodeDto extends createZodDto(codeSchema) {}
