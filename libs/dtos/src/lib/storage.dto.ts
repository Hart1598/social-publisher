import { createUploadUrlPayloadSchema } from "@app/validators";
import { createZodDto } from "nestjs-zod";

export class CreateUploadUrlPayloadDto extends createZodDto(createUploadUrlPayloadSchema) {}
