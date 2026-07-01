const { io } = require("socket.io-client");

const socket = io("http://localhost:4000", {
    auth: {
        type: "dashboard",
    }
});

socket.on("connect", () => {
  console.log("Dashboard Connected");

  socket.emit("dashboard:join");
});

socket.on("vehicle:update", (location) => {
  console.log(location);
});

socket.on("connect_error", (error) => {
  console.log(error.message);
});