import Axios from "../service/Axios";

const useAuth = (data) => {
  let isLoggedIn = false;
  let user = {};

  Axios.get('http://localhost:5000/user/isAuth')
  .then(function (response) {
      // SUCCESS
      isLoggedIn = true;
      user=(response.data);
      console.log(response)
      console.log(response.data.nickname, " is logged in")
  })
  .catch(function (error) {
      // FAIL
      console.log(error);
      console.log("No user in session")
  });

  return {
    isLoggedIn,
    user
  };
};

export default useAuth;