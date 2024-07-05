import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import './Header.css';

const GET_USERNAME = gql`
  query GetUsername {
    getUsername {
      username
    }
  }
`;

const Header = ({ openProfileModal }) => {
  const [username, setUsername] = useState('');
  const { loading, error, data } = useQuery(GET_USERNAME, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (data && data.getUsername) {
      setUsername(data.getUsername.username);
    }
  }, [data]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleUsernameClick = () => {
    openProfileModal();
  };

  return (
    <header className="header">
      <h1>Truth or Dare</h1>
      <div className="user-info">
        <p>
          Hi, <span onClick={handleUsernameClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{username}</span>
        </p>
      </div>
    </header>
  );
};

Header.propTypes = {
    openProfileModal: PropTypes.func.isRequired,
  };

export default Header;
