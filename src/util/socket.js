import io from 'socket.io-client';
import { url } from '../services/api';

export const socket = io.connect('http://localhost:5050');

