import { Button, Radio, Space, Spin } from "antd";
import React from "react";
import { AllHtmlEntities as htmlEntities } from "html-entities";

import { Question } from "../../types";
import { RadioChangeEvent } from "antd/lib/radio";

export type QuizProps = {
    questions: Array<Question>;
    questionIndex: number;
    score: number;
    onBack: () => void;
    onNext: () => void;
    onFinish: () => void;
    onOptionSelect: (e: RadioChangeEvent) => void;
};

const Quiz: React.FC<QuizProps> = ({
    // state
    questions,
    questionIndex,
    score,
    // callbacks
    onBack,
    onNext,
    onFinish,
    onOptionSelect
}) => {
    const currentQuestion = questions[questionIndex];

    if (questions.length === 0) {
        return <Spin size="large" />
    }


    return (
        <div>
            <h1>Question {questionIndex + 1}:</h1>
            <h2>{htmlEntities.decode(currentQuestion.question)}</h2>
            <Radio.Group buttonStyle="solid" onChange={onOptionSelect}>
                {currentQuestion.options
                    .map((option) => <Radio.Button style={{display: "block"}} key={option} value={option}>{option}</Radio.Button>)}
            </Radio.Group>
            <br />
            <br />
            <Space>
                {questionIndex !== 0 ? <Button htmlType="button" onClick={onBack}>
                    Back
                </Button> : null}
                {
                    questionIndex < 4 ?
                        <Button type="primary" htmlType="button" onClick={onNext}>
                            Next
                        </Button> :
                        <Button type="primary" htmlType="button" onClick={onFinish}>
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