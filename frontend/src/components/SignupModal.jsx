import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import PropTypes from 'prop-types';
import './SignupModal.css'; 

const CREATE_USER = gql`
  mutation ($email: String!, $password: String!, $username: String!, $gender: String!) {
    createUser(email: $email, password: $password, username: $username, gender:$gender) {
      email
      username
      gender
      id
      dateJoined
    }
  }
`;

const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'N', label: 'Nonbinary' },
];

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');

  const [createUser] = useMutation(CREATE_USER);

  const handleSignup = () => {
    createUser({ variables: { email, password, username, gender } })
      .then(result => {
        console.log('User created:', result.data.createUser);
        onClose();
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  const handleBack = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          {genderOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

SignupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignupModal;
