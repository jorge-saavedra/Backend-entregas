const socket = io();

socket.emit("message", "Hi, mi name is Willys");

socket.on("event_for_socket", (data) => {
  console.log(data);
});

socket.on("event_for_all_Not_socket", (data) => {
  console.log(data);
});

socket.on("event_for_all", (data) => {
  console.log(data);
});
