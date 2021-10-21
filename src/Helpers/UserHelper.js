export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return localStorage.getItem("jwt");
    }
    return false;
  };
  

export const SignOutUser = async() =>{
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    return await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      method: "POST",
    })
      .then((response) => {
        console.log("sign Out", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};