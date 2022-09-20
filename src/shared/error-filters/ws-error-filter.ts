import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    console.log(exception);
    const client = host.switchToWs().getClient() as Socket;
    const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };

    Logger.error(`${client.nsp.name}`, JSON.stringify(details.message), 'WSExceptionFilter');

    client.emit(
      'exception',
      JSON.stringify({
        event: 'exception',
        data: {
          id: (client as any).id,
          ...details,
        },
      })
    );
  }
}
