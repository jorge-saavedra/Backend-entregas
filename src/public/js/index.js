const socket = io();

// socket.emit("message", "Hi, mi name is Willys");

socket.on("add-product", (data) => {
  console.log("add-product", data);
});

socket.on("event_for_all_Not_socket", (data) => {
  console.log("event_2", data);
});

socket.on("event_for_all", (data) => {
  console.log("event_3", data);
});

// Apuntar a http localhost8080 api/products/{id}
let all_btn_delete = document.querySelectorAll(".btn_delete");
all_btn_delete.forEach((each_button_delete) => {
  each_button_delete.addEventListener("click", () => {
    fetch(`/api/products/${each_button_delete.id}`, {
      method: "delete",
    })
      .then(() => console.log((each_button_delete.id, "Delete successful")))
      .catch((err) => console.log(err));
  });
});
