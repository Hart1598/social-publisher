import { Injectable } from "@nestjs/common";
import { RpcException } from '@nestjs/microservices';

export class RpcErrorMessage {
  isRpcError: boolean;
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.isRpcError = true;
    this.message = message;
    this.status = status;
  }
}

@Injectable()
export class ExceptionService {
  constructor() {}

  conflict() {
    throw new RpcException(new RpcErrorMessage('Conflict', 409));
  }

  forbidden() {
    throw new RpcException(new RpcErrorMessage('Forbidden', 403));
  }
}
