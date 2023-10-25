export interface Sensor {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}

export const Command = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
} as const;
