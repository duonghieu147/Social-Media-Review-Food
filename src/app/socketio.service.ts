import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
export class SocketioService {

    socket :any ;

    constructor() { }

    setupSocketConnection() {
        // this.socket = io(environment.SOCKET_ENDPOINT, {
        //     auth: {
        //         token: "abc"
        //     }
        // });

        // this.socket.emit('my message', 'Hello there from Angular.');

        // this.socket.on('my broadcast', (data: string) => {
        //     console.log(data);
        // });
    }

    disconnect() {
        // if (this.socket) {
        //     this.socket.disconnect();
        // }
    }
}