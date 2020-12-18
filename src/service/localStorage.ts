export const setUserPref = (data: object) => {
    window.localStorage.setItem("user", JSON.stringify(data));
};

export const getUserPref = () => {
    return window.localStorage.getItem("user");
};