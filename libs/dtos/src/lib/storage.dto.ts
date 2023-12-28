import { createUploadUrlPayloadSchema, deleteUserFileSchema, deleteFile, getUserFileSchema, getFile, getFiles, getUserFiles, getFileUrl, getFilesUrl, getUserFileUrl, getUserFilesUrl } from "@app/validators";
import { createZodDto } from "nestjs-zod";

export class CreateUploadUrlPayloadDto extends createZodDto(createUploadUrlPayloadSchema) {}

export class DeleteUserFileSchemaDto extends createZodDto(deleteUserFileSchema) {}

export class DeleteFileSchemaDto extends createZodDto(deleteFile) {}

export class GetUserFileDto extends createZodDto(getUserFileSchema) {}

export class GetFileDto extends createZodDto(getFile) {}

export class GetFilesDto extends createZodDto(getFiles) {}

export class GetUserFilesDto extends createZodDto(getUserFiles) {}

export class GetFileUrlDto extends createZodDto(getFileUrl) {}

export class GetFilesUrlDto extends createZodDto(getFilesUrl) {}

export class GetUserFileUrlDto extends createZodDto(getUserFileUrl) {}

export class GetUserFilesUrlDto extends createZodDto(getUserFilesUrl) {}
