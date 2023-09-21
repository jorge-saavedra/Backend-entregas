const socket = io();

socket.emit("message", "Hi, mi name is Willys");

socket.on("add-product", (data) => {
  console.log("add-product", data);
});

socket.on("event_for_all_Not_socket", (data) => {
  console.log("event_2", data);
});

socket.on("event_for_all", (data) => {
  console.log("event_3", data);
});
