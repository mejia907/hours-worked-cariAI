interface DataPoint {
  concept: string;
  hours: number;
}

export type RechartsBarProps = {
  data: DataPoint[];
}
