/* eslint-disable @typescript-eslint/no-explicit-any */
import { Catch, ArgumentsHost, ExceptionFilter as BaseFilter, HttpException } from '@nestjs/common';
import { RpcErrorMessage } from './exception.service';

const createExceptionPayload = (status?: number, message?: string, path?: string) => {
  const timestamp = new Date().toISOString()

  const payload = {
    status: status || 500,
    message: message || 'Internal error',
    timestamp,
    path: path || null,
  }

  return payload;
}

const checkIsRpc = (error: unknown): error is RpcErrorMessage => {
  const isObject = typeof error === 'object' && error !== null;

  if (!isObject) return false;

  const isHasRpcKey = 'isRpcError' in error;

  if (!isHasRpcKey) return false;

  return error.isRpcError as boolean;
}

@Catch()
export class ExceptionFilter implements BaseFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal Server Error';

    const isRpc = checkIsRpc(exception)

    if(isRpc) {
      const rpcError = exception;

      status = rpcError.status;

      message = rpcError.message;
    }

    if(exception instanceof HttpException) {
      status = exception.getStatus();

      const resp = exception.getResponse()

      message = resp.toString() || message;
    }

    if(exception instanceof Error) {
      message = exception.message;
    }

    const payload = createExceptionPayload(status, message, request.url);

    response.status(status).send(payload);
  }
}
