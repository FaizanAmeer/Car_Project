export default function getToken() {
  const cookies = document.cookie.split(";");
  let token = null;
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name === "token") {
      token = value;
    }
  });
  if (!token) {
    throw new Error("Token not found");
  }
  return token;
}
