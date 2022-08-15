/* eslint-disable */

export default function isAuthenticated() {
  const hasToken: boolean = localStorage.getItem("token") != null;

  console.log("user is authenticated : ", hasToken);
  return hasToken;
}
