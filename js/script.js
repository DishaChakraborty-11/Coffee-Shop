document.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:5000/menu")
    .then(res => res.json())
    .then(data => {
      console.log("Menu:", data);
      // render menu items here
    })
    .catch(err => console.error(err));
});
