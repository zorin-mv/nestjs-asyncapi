import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

interface IErrorMessage {
  statusCode: number;
  message: string[] | string;
  error: string;
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = '';

    if (typeof exception.getResponse === 'function') {
      const exceptionResponse = (exception.getResponse() as IErrorMessage)?.message;

      errorMessage = Array.isArray(exceptionResponse) ? exceptionResponse?.join(' & ') : exceptionResponse;
    }

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: errorMessage || exception.message || 'Internal server error',
    };

    Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');
    response.status(status).json(errorResponse);
  }
}
