import * as React from "react";
import ButtonPanel from "../../components/elevator/ButtonPanel";
import ElevatorsPanel from "../../components/elevator/ElevatorsPanel";
import Alert from "../../components/elevator/Alert";

const io = require("socket.io-client");

class ImplementationPage extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      floors: [],
      elevators: [],
      loading: true,
      activeFloorRequest: null,
      alert: null,
      socket: io.connect("http://localhost:3000")
    };
  }

  public componentDidMount() {
    // Get elevators and floors from backend – pass to state
    this.state.socket.on("elevatorState", data => {
      this.setState({
        elevators: data.elevators,
        floors: data.floors,
        loading: false
      });

      // Unset floor request state if there is an elevator on the requested floor
      if (this.getElevatorOnRequestedFloor(this.state.activeFloorRequest)) {
        this.setState({
          activeFloorRequest: null
        });
      }
    });

    // Listen for alerts
    this.state.socket.on("alert", data => {
      this.showAlert(data.message, data.variant);
    });
  }

  public getElevatorOnRequestedFloor = floor =>
    this.state.elevators.find(elevator => elevator.floor === floor);

  public showAlert(message, variant) {
    this.setState({
      alert: {
        message: message,
        variant: variant
      }
    });

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 4000);
  }

  public requestElevator(floor) {
    // Show alert message if there already is an elevator on the requested floor
    const isElevatorOnRequestedFloor = this.getElevatorOnRequestedFloor(floor);

    if (isElevatorOnRequestedFloor) {
      this.showAlert(
        "Elevator " + isElevatorOnRequestedFloor.name + " is ready.",
        "success"
      );
      return;
    }

    // API request
    this.state.socket.emit("requestElevator", floor);
    this.setState({
      activeFloorRequest: floor
    });
  }

  public render() {
    return (
      <div className="block md:flex flex-row h-screen">
        {this.state.loading ? (
          "Loading..."
        ) : (
          <>
            <Alert alert={this.state.alert} />
            <ElevatorsPanel
              elevators={this.state.elevators}
              activeFloorRequest={this.state.activeFloorRequest}
            />
            <ButtonPanel
              floors={this.state.floors}
              clickHandler={this.requestElevator.bind(this)}
              activeFloorRequest={this.state.activeFloorRequest}
            />
          </>
        )}
      </div>
    );
  }
}

export default ImplementationPage;
