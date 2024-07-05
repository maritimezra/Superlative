import { useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ME = gql`
  query Me {
    me {
      username
      email
      gender
    }
  }
`;


const genderMapping = {
  M: 'Male',
  F: 'Female',
  N: 'Nonbinary'
};

const ProfileModal = ({ isOpen, onClose }) => {
  const { loading, error, data } = useQuery(ME);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/logout')
  };

  if (!isOpen) return null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username, email, gender } = data.me;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Profile Details</h2>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Gender:</strong> {genderMapping[gender] || gender}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

ProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProfileModal;