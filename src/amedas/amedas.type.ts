export type JmaAmedasData = {
  [datetime: string]: {
    prefNumber: number;
    observationNumber: number;
    pressure?: (number | null)[];
    normalPressure?: (number | null)[];
    temp?: (number | null)[];
    humidity?: (number | null)[];
    snow?: (number | null)[];
    snow1h: (number | null)[];
    snow6h: (number | null)[];
    snow12h: (number | null)[];
    snow24h: (number | null)[];
    sun10m?: (number | null)[];
    sun1h?: (number | null)[];
    precipitation10m: (number | null)[];
    precipitation1h: (number | null)[];
    precipitation3h: (number | null)[];
    precipitation24h: (number | null)[];
    windDirection?: (number | null)[];
    wind?: (number | null)[];
    maxTempTime: {
      hour: number | null;
      minute: number | null;
    };
    maxTemp?: (number | null)[];
    minTempTime: {
      hour: number | null;
      minute: number | null;
    };
    minTemp?: (number | null)[];
    gustTime: {
      hour: number | null;
      minute: number | null;
    };
    gustDirection?: (number | null)[];
    gust?: (number | null)[];
  };
};

export interface JmaAmedasTable {
  [amedasCode: string]: {
    type: 'A' | 'B' | 'C';
    elems: string;
    lat: [number, number];
    lon: [number, number];
    alt: number;
    kjName: string;
    knName: string;
    enName: string;
  };
}
