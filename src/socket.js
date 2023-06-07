import { io } from "socket.io-client";
import { url } from './services/api';

export const socket = io('http://localhost:5050');
