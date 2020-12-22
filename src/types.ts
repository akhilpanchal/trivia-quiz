export type Question = {
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    options: Array<string>;
};