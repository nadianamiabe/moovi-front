const isUnauthorized = ({ status }) => status === 401;

const isTokenExpired = ({ message }) => message === "Token expirado";

const logout = () => {
  localStorage.removeItem("loggedItem");
  window.location = "/login";
};

export default async err => {
  const { response } = err;

  if (isUnauthorized(response) && isTokenExpired(response.data)) {
    logout();
    return err;
  }

  return;
};
