import firebase from "firebase";

export type User = {
    email: string;
    score: number;
};

const getUserName = (email: string) => email.split("@")[0]; 

export const setUser = (user: User) => {
    const { email, score } = user;
    const userName = getUserName(email);

    firebase.database().ref('users/' + userName).set({
        score,
      }, (error: any) => {
          if (error) {
              console.error("Error occurred while adding a user", error);
          } else {
              console.log("User was added successfully");
          }
      });
};

export const getUser = (email: string) => {
    const userName = getUserName(email);

    return firebase.database().ref('users/' + userName).once("value");
}

export const addUserListener = (email: string, cb: (snapshot: any) => void) => {
    const userName = getUserName(email);

    firebase.database().ref('users/' + userName).on("value", cb);
}

export const removeUserListener = (email: string) => {
    const userName = getUserName(email);

    firebase.database().ref('users/' + userName).off();
}
