import axios from "axios";
import queryString from "query-string";
import {Question} from "../types";

const BASE_URL = "https://opentdb.com/api.php";

export const getQuestion = async (params = {amount: 10, difficulty: "easy", type: "multiple" }): Promise<Array<Question>> => {
    const queryParams = queryString.stringify(params);

    const result = await axios.get(`${BASE_URL}?${queryParams}`);

    return result.data.results;
};
