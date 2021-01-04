import { Button, Radio, Space, Spin } from "antd";
import React from "react";
import { AllHtmlEntities as htmlEntities } from "html-entities";

import {getQuestion} from "../service/questions";
import CurrentUserContext from "../CurrentUserContext";
import {Question} from "../types";
import shuffle from "../utils/shuffle";
import { getUser, addUserListener, setUser, removeUserListener } from "../service/user";

type QuestionProps = {
    type?: string;
};

const Quiz: React.FC<QuestionProps> = (props) => {
    const { email } = React.useContext(CurrentUserContext);

    const [questions, setQuestions] = React.useState<Array<Question>>([]);
    const [questionIndex, setQuestionIndex] = React.useState<number>(0);
    const [userAnswer, setUserAnswer] = React.useState<string>();
    const [score, setScore] = React.useState<number>(0);

    console.log("score::: ", score);
    const currentQuestion = questions[questionIndex];

    const handleSelect = React.useCallback((e) => {
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
    }, []);

    const next = React.useCallback(() => {
        if (userAnswer === currentQuestion.correct_answer) {
            setUser({email, score: score + 1});
        }
        setQuestionIndex(questionIndex + 1);
    }, [email, score, userAnswer, questionIndex, currentQuestion]);

    const finish = React.useCallback(() => {
        if (userAnswer === currentQuestion.correct_answer) {
            setUser({email, score: score + 1});
        }
        setQuestionIndex(questionIndex + 1);
    }, [email, score, userAnswer, questionIndex, currentQuestion]);

    const back = React.useCallback(() => {
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

    if (questions.length === 0) {
        return <Spin size="large" />
    }


    return (
        <div>
            <h1>Question {questionIndex + 1}:</h1>
            <h2>{htmlEntities.decode(currentQuestion.question)}</h2>
            <Radio.Group buttonStyle="solid" onChange={handleSelect}>
                {currentQuestion.options
                    .map((option) => <Radio.Button style={{display: "block"}} key={option} value={option}>{option}</Radio.Button>)}
            </Radio.Group>
            <br />
            <br />
            <Space>
                {questionIndex !== 0 ? <Button htmlType="button" onClick={back}>
                    Back
                </Button> : null}
                {
                    questionIndex < 4 ?
                        <Button type="primary" htmlType="button" onClick={next}>
                            Next
                        </Button> :
                        <Button type="primary" htmlType="button" onClick={finish}>
                          Finish
                      </Button>
                }
            </Space>
            <br />
            <br />
            CorrectAnswer: {currentQuestion.correct_answer}
            <br />
            <h3>Score: {score}</h3>
        </div>
    )
}

export default Quiz;