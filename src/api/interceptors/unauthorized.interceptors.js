const isUnauthorized = ({ status }) => status === 401;

const isTokenExpired = ({ message }) => message === "Token expirado";

const logout = () => {
  localStorage.removeItem("loggedUser");
  window.location = "/users/login";
};

export default async err => {
  const { response } = err;
  console.log(response.data);
  if (isUnauthorized(response) && isTokenExpired(response.data)) {
    logout();
    return err;
  }

  return;
};
