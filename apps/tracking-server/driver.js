const { io } = require("socket.io-client");

const socket = io("http://localhost:4000");

socket.on("connect", () => {
    console.log("Driver Connected");

    setInterval(() => {

        socket.emit("location:update", {

            vehicleId: "CAR-101",

            latitude: 17.385,

            longitude: 78.486,

            speed: 45,

            heading: 90,

            timestamp: Date.now()

        });

    },1000);

});