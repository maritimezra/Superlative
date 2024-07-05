import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';


const GET_LOBBY = gql`
  query GetLobby($lobbyId: Int!) {
    getLobby(lobbyId: $lobbyId) {
      id
      level
      category
      name
    }
  }
`;


const LobbyInstance = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const lobbyId = searchParams.get('id');

  const { loading: loadingLobby, error: errorLobby, data: dataLobby } = useQuery(GET_LOBBY, {
    variables: { lobbyId: parseInt(lobbyId) },
  });



  if (loadingLobby) return <p>Loading...</p>
  if (errorLobby) return <p>Error: {errorLobby.message}</p>;

  const lobby = dataLobby.getLobby;


  const handleHome = async () => {
    navigate('/')
  };

  const handleStartGame = async () => {
    navigate(`/play-game?id=${lobbyId}`);
  };

  return (
    <div>
      <h2>{lobby.name}</h2>
      <p>Level: {lobby.level}</p>
      <p>Category: {lobby.category}</p>
      <button onClick={handleHome}>Home</button>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default LobbyInstance;
