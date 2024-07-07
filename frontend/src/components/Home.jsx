import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';


const GET_LOBBIES = gql`
  query GetLobbies {
    getLobbies {
      id
      name
      level
      category
    }
  }
`;

const GET_USERNAME = gql`
  query GetUsername {
    getUsername {
      username
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');


  const { loading: usernameLoading, error: usernameError, data: usernameData } = useQuery(GET_USERNAME,{
    fetchPolicy: 'network-only',
    onError: () => {
      navigate('/login');
    },
  });

  const { loading, error, data, refetch } = useQuery(GET_LOBBIES, {
    fetchPolicy: 'network-only',
    onError: () => {
      navigate('/login');
    },
  });

  const handleCreateNew = () => {
    navigate('/create-lobby');
  };



  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  useEffect(() => {
    if (usernameData && usernameData.getUsername) {
      setUsername(usernameData.getUsername.username);
    }
  }, [usernameData]);

  if (loading || usernameLoading) return <p>Loading...</p>;
  if (error || usernameError) return <p>{error ? error.message : usernameError.message}</p>;

  const lobbies = data.getLobbies;

  return (
    <div className="home">
      <div>
        <h2>{`Hi, ${username}`}</h2>
      </div>
      <div className="lobbies-section">
        <h2>Your Lobbies</h2>
        <ul>
          {lobbies.map((lobby) => (
            <li key={lobby.id} onClick={() => navigate(`/lobby-details?id=${lobby.id}`)} style={{ cursor: 'pointer' }}>
              <h3>{lobby.name}</h3>
            </li>
          ))}
        </ul>
        <button onClick={handleCreateNew}>Create New</button>
      </div>

    </div>
  );
};

export default Home;
