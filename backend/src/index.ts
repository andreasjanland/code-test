import * as cors from "kcors";
import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";

const IO = require("koa-socket-2");
const app = new Koa();
const io = new IO();

const elevators = [
  { name: "A", destination: null, floor: 2 },
  { name: "B", destination: null, floor: 11 },
  { name: "C", destination: null, floor: 5 },
  { name: "D", destination: null, floor: 19 },
  { name: "E", destination: null, floor: 12 }
];
const floors = [
  { floor: 0, requesting: false },
  { floor: 1, requesting: false },
  { floor: 2, requesting: false },
  { floor: 3, requesting: false },
  { floor: 4, requesting: false },
  { floor: 5, requesting: false },
  { floor: 6, requesting: false },
  { floor: 7, requesting: false },
  { floor: 8, requesting: false },
  { floor: 9, requesting: false },
  { floor: 10, requesting: false },
  { floor: 11, requesting: false },
  { floor: 12, requesting: false },
  { floor: 13, requesting: false },
  { floor: 14, requesting: false },
  { floor: 15, requesting: false },
  { floor: 16, requesting: false },
  { floor: 17, requesting: false },
  { floor: 18, requesting: false },
  { floor: 19, requesting: false }
];

const getMostSutitableElevator = floor =>
  // Sort elevators by closest floors. Filter idle elevators.
  elevators
    .sort((a, b) => Math.abs(a.floor - floor) - Math.abs(b.floor - floor))
    .filter(elevator => !elevator.destination)[0];

const getFloor = floor => floors.find(f => f.floor === floor);

const startElevator = (elevator, requestedFloor, socket) => {
  // Set destination and send state to client
  const destination = requestedFloor.floor;
  elevator.destination = destination;
  socket.emit("elevatorState", { elevators, floors });

  const moveElevator = setInterval(() => {
    // Move elevator 1 floor every 2 seconds
    elevator.floor += elevator.floor > destination ? -1 : 1;

    if (elevator.floor === destination) {
      // Make elevator idle when destination is reached
      elevator.destination = null;

      requestedFloor.requesting = false;

      // Send alert message to client
      socket.emit("alert", {
        message: "Elevator " + elevator.name + " is ready.",
        variant: "success"
      });

      clearInterval(moveElevator);
    }

    // Send elevators/floors state to client on each interval
    socket.emit("elevatorState", { elevators, floors });
  }, 2000);
};

io.attach(app);

io.on("connection", socket => {
  // Send elevator/floor state to client
  socket.emit("elevatorState", { elevators, floors });

  // Request elevator
  socket.on("requestElevator", floor => {
    const requestedFloor = getFloor(floor);
    const closestElevator = getMostSutitableElevator(requestedFloor.floor);

    if (!closestElevator) {
      // Send alert message to client if there is no elevator available
      socket.emit("alert", {
        message: "No elevator is available.",
        variant: "danger"
      });

      return;
    }

    if (closestElevator.floor == requestedFloor.floor) return;

    if (!requestedFloor.requesting) {
      // Start elevator if there is an idle elevator
      requestedFloor.requesting = true;
      startElevator(closestElevator, requestedFloor, socket);
    }
  });
});

app.use(
  bodyparser({
    enableTypes: ["json"]
  })
);
app.use(cors());
app.listen(3000);
