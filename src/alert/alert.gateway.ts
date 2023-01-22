import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/rate', cors: true })
export class AlertGateway implements OnGatewayInit {
  private logger: Logger = new Logger('AlertGateway');

  @WebSocketServer() wss: Server;

  afterInit() {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('SuscribeExchangeChannel')
  handleMessage(client: Socket, payload: any) {
    client.join(payload.channelTest);
    this.logger.log(`User Conected`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async incomingMessage(valueTest: string) {
    console.log('valueTest ', valueTest);
    this.wss.emit('refreshExchangeHistory', { refresh: true });
  }
}
