interface DataPoint {
  concept: string;
  hours: number;
}

export type RechartsPieProps = {
  data: DataPoint[];
}
