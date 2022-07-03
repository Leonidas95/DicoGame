import { useEffect, useState } from 'react';
import { Manager } from 'socket.io-client';

const manager = new Manager(process.env.NEXT_PUBLIC_API_ENDPOINT);
const socket = manager.socket('/lobbies');

export const useLobbiesSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const createLobby = () => {
    socket.emit('request', {
      method: 'createLobby',
      data: { name: 'hello world', maxPlayers: 2, rounds: 2, isPrivate: false },
    });
  };

  return { isConnected, createLobby };
};
