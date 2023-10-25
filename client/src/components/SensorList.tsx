import React from "react";
import { Command, Sensor as SensorType } from "../types";
import Button from "./Button";
import { classNames } from "../utils";
import Filter from "./Filter";

const statuses: Record<"connected" | "disconnected", string> = {
  connected: "text-green-400 bg-green-400/10",
  disconnected: "text-gray-500 bg-gray-100/10",
};

type FilterOptions = "All Sensors" | "Connected Sensors";

const filterOptions: Array<FilterOptions> = [
  "All Sensors",
  "Connected Sensors",
];

const SensorList: React.FC = () => {
  const [ws, setWss] = React.useState<WebSocket>();
  const [sensorList, setSensorList] = React.useState<SensorType[]>([]);
  const [selectedOption, setSelectedOption] = React.useState(filterOptions[0]);

  if (ws) {
    ws.onopen = () => {
      console.log("Connected to the WSS server");
    };

    ws.onclose = () => {
      console.log("Disconnected from the WSS server");
    };

    ws.onmessage = (ev) => {
      const { data } = ev;
      const sensor: SensorType = JSON.parse(data);

      if (isSensorAdded(sensor.id)) {
        const result = sensorList.map((existingSensor) => {
          if (sensor.id === existingSensor.id) {
            return sensor;
          } else {
            return existingSensor;
          }
        });
        setSensorList(result);
      } else {
        setSensorList((currentList) => [...currentList, sensor]);
      }
    };
  }

  const isSensorAdded = (sensorId: string): boolean => {
    const exists = sensorList.find((sensor) => sensor.id === sensorId);
    return Boolean(exists);
  };

  React.useEffect(() => {
    connectToWss();

    return () => {
      ws?.close();
    };
  }, []);

  const connectToWss = () => {
    const ws = new WebSocket("ws://localhost:5001");
    setWss(ws);
  };

  const connectSensor = (id: string) => {
    if (ws) {
      const data = JSON.stringify({ command: Command.CONNECT, id });
      ws.send(data);
    }
  };

  const disconnetSensor = (id: string) => {
    if (ws) {
      const data = JSON.stringify({ command: Command.DISCONNECT, id });
      ws.send(data);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-32 bg-gray-800 h-full">
      <div className="mb-4">
        <Filter
          options={filterOptions}
          onChange={(selectedOption) =>
            setSelectedOption(selectedOption as FilterOptions)
          }
        />
      </div>
      <ul role="list" className="divide-y divide-white/5">
        {(selectedOption === "Connected Sensors"
          ? sensorList.filter((sensor) => sensor.connected)
          : sensorList
        ).map((sensor) => (
          <li
            key={sensor.id}
            className="relative flex items-center space-x-4 py-4"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div
                  className={classNames(
                    statuses[sensor.connected ? "connected" : "disconnected"],
                    "flex-none rounded-full p-1"
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  {sensor.name}
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                <p className="truncate">
                  Status: {sensor.connected ? "connected" : "disconnected"}
                </p>
                <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5 flex-none fill-gray-300"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="whitespace-nowrap">Unit: {sensor.unit}</p>
                {sensor.value && (
                  <>
                    <svg
                      viewBox="0 0 2 2"
                      className="h-0.5 w-0.5 flex-none fill-gray-300"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="whitespace-nowrap">
                      Value: {sensor.value ? sensor.value : "--"}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <Button
                variant={sensor.connected ? "secondary" : "primary"}
                onClick={() =>
                  sensor.connected
                    ? disconnetSensor(sensor.id)
                    : connectSensor(sensor.id)
                }
              >
                {sensor.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorList;
