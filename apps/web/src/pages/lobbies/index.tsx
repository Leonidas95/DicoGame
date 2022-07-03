import { useLobbiesSocket } from './hooks/useLobbiesSocket';

const Lobbies = () => {
  const { isConnected, createLobby } = useLobbiesSocket();

  return (
    <div>
      <h1>Lobbies - {isConnected ? 'Connected!' : 'Not Connected :('}</h1>
      <div onClick={createLobby}>createLobby</div>
    </div>
  );
};

export default Lobbies;
