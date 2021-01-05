import React from 'react';
import useQuizForGuest from '../../hooks/useQuizForGuest';
import Quiz from './Quiz';

const GuestQuiz: React.FC = (props) => {
    const quizProps  = useQuizForGuest();

    return <Quiz {...quizProps} />;
};

export default GuestQuiz;