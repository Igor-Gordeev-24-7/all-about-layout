const isAdmin = localStorage.getItem("isAuth") == "true";
console.log(isAdmin);
if (!isAdmin) {
  window.location.assign("http://127.0.0.1:5500/frontend/index.html");
}
