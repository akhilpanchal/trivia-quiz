
import React from 'react';
import { AllHtmlEntities as htmlEntities } from "html-entities";
import CurrentUserContext from '../CurrentUserContext';
import { getQuestion } from '../service/questions';
import { addUserListener, getUser, removeUserListener, setUser } from '../service/user';
import { Question } from '../types';
import shuffle from '../utils/shuffle';
import { QuizProps } from '../components/quiz/Quiz';

function useQuizForAuthUser(): QuizProps {
    const { email } = React.useContext(CurrentUserContext);

    const [questions, setQuestions] = React.useState<Array<Question>>([]);
    const [questionIndex, setQuestionIndex] = React.useState<number>(0);
    const [userAnswer, setUserAnswer] = React.useState<string>();
    const [score, setScore] = React.useState<number>(0);

    console.log("score::: ", score);
    const currentQuestion = questions[questionIndex];

    const handleOptionSelect = React.useCallback((e) => {
        setUserAnswer(e.target.value);
    }, []);

    React.useEffect(() => {
        // Get current Score from DB
        const fetchUser = async () => {
            const user: any = await getUser(email);
            const userVal = user.val();
            setScore(userVal.score);
        };
        fetchUser();

        // Subscribe to score updates
        addUserListener(email, (snapshot) => {
            setScore(snapshot?.val().score);
        })

        return () => {
            removeUserListener(email);
        };
        // We want this effect to run only once when the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onNext = React.useCallback(() => {
        if (userAnswer === currentQuestion.correct_answer) {
            setUser({email, score: score + 1});
        }
        setQuestionIndex(questionIndex + 1);
    }, [email, score, userAnswer, questionIndex, currentQuestion]);

    const onFinish = React.useCallback(() => {
        if (userAnswer === currentQuestion.correct_answer) {
            setUser({email, score: score + 1});
        }
        // TODO: navigate to results page
    }, [email, score, userAnswer, currentQuestion]);

    const onBack = React.useCallback(() => {
        setQuestionIndex(questionIndex - 1);
    }, [questionIndex]);

    React.useEffect(() => {
        const fetchQuestions = async () => {
            const questions = await getQuestion();
            const decoded: Array<Question> = questions.map(
                ({question, correct_answer, incorrect_answers, category }) => {
                    return {
                        question: htmlEntities.decode(question),
                        correct_answer: htmlEntities.decode(correct_answer),
                        incorrect_answers: incorrect_answers.map(answer => htmlEntities.decode(answer)),
                        options: shuffle(incorrect_answers.concat(correct_answer)),
                        category,
                    }
                }
            );

            setQuestions(decoded);
        };

        fetchQuestions();
    }, []);

    return {
        questions,
        questionIndex,
        score,
        onBack,
        onNext,
        onFinish,
        onOptionSelect: handleOptionSelect
    };
};

export default useQuizForAuthUser;