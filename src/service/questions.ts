import axios from "axios";
import queryString from "query-string";

const BASE_URL = "https://opentdb.com/api.php";

// https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple

type QuestionResponse = {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string;
};

export const getQuestion = async (params = {amount: 10, difficulty: "easy", type: "multiple" }): Promise<QuestionResponse> => {
    console.log("params:: ", params);

    const queryParams = queryString.stringify(params);

    console.log("queryParams:: ", queryParams);

    const result = await axios.get(`${BASE_URL}?${queryParams}`);

    console.log("result: ", result);

    return result.data.results[0];
};