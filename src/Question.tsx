import React from "react";
import {getQuestion} from "./service/questions";

type QuestionProps = {
    type?: string;
};

const Question: React.FC<QuestionProps> = (props) => {
    return (
        <div>
            Question With Options
        </div>
    )
}

export default Question;