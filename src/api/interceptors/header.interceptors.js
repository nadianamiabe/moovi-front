export default async config => {
  const token = localStorage.getItem("loggedUser");

  if (token) {
    console.log('djasldjslkjsakldjsldkaj')
    const tokenJson = JSON.parse(token);
    config.headers.Authorization = `Bearer ${tokenJson.token}`;
  }

  return config;
};
