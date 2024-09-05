import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
export declare class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
