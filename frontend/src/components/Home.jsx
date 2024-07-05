import { useEffect } from 'react'
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

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, data, refetch } = useQuery(GET_LOBBIES, {
    fetchPolicy: 'network-only'
  });

  const handleCreateNew = () => {
    navigate('/create-lobby');
  };


  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const lobbies = data.getLobbies;

  return (
    <div className="home">
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
