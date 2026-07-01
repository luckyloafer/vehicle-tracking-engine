const { io } = require("socket.io-client");

const socket = io("http://localhost:4000", {
    auth: {
        type: "driver",
        vehicleId: "CAR-101"
    }
});

socket.on("connect", () => {
  console.log("Driver Connected");

  socket.emit("driver:join");

  let latitude = 17.385;
  let longitude = 78.486;

  setInterval(() => {
    latitude += 0.0001;
    longitude += 0.0001;

    socket.emit(
      "location:update",
      {
        latitude,
        longitude,
        speed: 45,
        heading: 90,
        timestamp: Date.now(),
      },
      (ack) => {
        console.log("ACK :", ack);
      },
        );
    }, 1000);
    });

socket.on("connect_error", (error) => {
  console.log(error.message);
});