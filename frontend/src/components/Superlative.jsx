import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import couplesMildQuestions from './questions/couples/mild.json';
import couplesModQuestions from './questions/couples/mod.json';
import couplesWildQuestions from './questions/couples/wild.json';
import partyMildQuestions from './questions/party/mild.json';
import partyModQuestions from './questions/party/mod.json';
import partyWildQuestions from './questions/party/wild.json';
import teensMildQuestions from './questions/teens/mild.json';
import teensModQuestions from './questions/teens/mod.json';
import teensWildQuestions from './questions/teens/wild.json';


const GET_LOBBY = gql`
  query GetLobby($lobbyId: Int!) {
    getLobby(lobbyId: $lobbyId) {
      id
      level
      category
    }
  }
`;


const Superlative = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const lobbyId = searchParams.get('id');

  const { loading: loadingLobby, error: errorLobby, data: dataLobby } = useQuery(GET_LOBBY, {
    variables: { lobbyId: parseInt(lobbyId) },
  });

  const [question, setQuestion] = useState('');


  useEffect(() => {
    if (dataLobby) {
      const { level, category } = dataLobby.getLobby;
      fetchQuestion( category, level);
    }
  }, [dataLobby]);



  const fetchQuestion = ( category, level) => {
    let questions;

    switch (category) {
      case 'Couples':
        switch (level) {
          case 'Mild':
            questions = couplesMildQuestions.Questions;
            break;
          case 'Moderate':
            questions = couplesModQuestions.Questions;
            break;
          case 'Wild':
            questions = couplesWildQuestions.Questions;
            break;
          default:
            throw new Error('Invalid level');
        }
        break;
      case 'GameNight':
        switch (level) {
          case 'Mild':
            questions = partyMildQuestions.Questions;
            break;
          case 'Moderate':
            questions = partyModQuestions.Questions;
            break;
          case 'Wild':
            questions = partyWildQuestions.Questions;
            break;
          default:
            throw new Error('Invalid level');
        }
        break;
      case 'Teens':
        switch (level) {
          case 'Mild':
            questions = teensMildQuestions.Questions;
            break;
          case 'Moderate':
            questions = teensModQuestions.Questions;
            break;
          case 'Wild':
            questions = teensWildQuestions.Questions;
            break;
          default:
            throw new Error('Invalid level');
        }
        break;
      default:
        throw new Error('Invalid category');
    }

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestion(randomQuestion);
  };



  const handleNextQuestion = () => {
    if (dataLobby) {
      const { level, category } = dataLobby.getLobby;
      fetchQuestion( category, level);
    }
  };


  const handleEndGame = () => {
    navigate('/')
  }

  if (loadingLobby ) return <p>Loading...</p>;
  if (errorLobby ) return <p>Error: { errorLobby.message }</p>;

  return (
    <div>
      <h1>Superlative</h1>
      <h2>Question: </h2>
      <div>
        <p>{question}</p>
      </div>
      <button onClick={handleNextQuestion}>Next Question</button>
      <button onClick={handleEndGame}>End Game</button>
    </div>
  );
};

export default Superlative;
