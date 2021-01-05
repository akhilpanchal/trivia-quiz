import React from 'react';
import useQuizForAuthUser from '../../hooks/useQuizForAuthUser';
import Quiz from './Quiz';

const UserQuiz: React.FC = (props) => {
    const quizProps  = useQuizForAuthUser();

    return <Quiz {...quizProps} />;
};

export default UserQuiz;