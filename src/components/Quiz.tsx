import { Button, Radio, Space, Spin } from "antd";
import React from "react";
import { AllHtmlEntities as htmlEntities } from "html-entities";

import useQuizForAuthUser from "../hooks/useQuizForAuthUser";

type QuestionProps = {
    type?: string;
};

const Quiz: React.FC<QuestionProps> = (props) => {

    const {
        // state
        questions,
        questionIndex,
        score,
        // callbacks
        back,
        next,
        finish,
        selectOption,
    } = useQuizForAuthUser();

    const currentQuestion = questions[questionIndex];

    if (questions.length === 0) {
        return <Spin size="large" />
    }


    return (
        <div>
            <h1>Question {questionIndex + 1}:</h1>
            <h2>{htmlEntities.decode(currentQuestion.question)}</h2>
            <Radio.Group buttonStyle="solid" onChange={selectOption}>
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