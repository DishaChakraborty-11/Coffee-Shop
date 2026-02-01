document.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:5000/menu")
    .then(res => res.json())
    .then(data => {
      console.log("Menu:", data);
      // render menu items here
    })
    .catch(err => console.error(err));
});

function placeOrder() {
  fetch("http://127.0.0.1:5000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Disha",
      item: "Cappuccino",
      quantity: 2,
      total: 300
    })
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => console.error(err));
}
