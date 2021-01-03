import firebase from "firebase";

export type User = {
    name: string;
    email: string;
    providerId: string;
    accessToken: string;
};

const getUserName = (email: string) => email.split("@")[0]; 

export const addUser = async (user: User) => {
    const { name, email, providerId, accessToken } = user;
    const userName = getUserName(email);

    firebase.database().ref('users/' + userName).set({
        name,
        email,
        providerId,
        accessToken,
        score: 0,
      }, (error: any) => {
          if (error) {
              console.error("Error occurred while adding a user", error);
          } else {
              console.log("User was added successfully");
          }
      });
};

export const updateUser = async (user: User) => {

}
