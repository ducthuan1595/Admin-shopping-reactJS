import io from 'socket.io-client';
import { url } from '../services/api';

export const socket = io.connect(url);

socket.emit('message', 'Hello server!');