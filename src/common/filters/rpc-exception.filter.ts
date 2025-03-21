import { Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const rpcError = exception.getError();

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (rpcError.toString().includes('Empty')) {
      console.log('Empty');
      return response.status(500).json({
        statusCode: 500,
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        message: rpcError
          .toString()
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'statusCode' in rpcError &&
      'message' in rpcError
    ) {
      const status = rpcError.statusCode;
      return response.status(status as number).json(rpcError);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcError,
    });
  }
}
