export interface JmaSeasonDataBase {
  temperature: {
    [areaCode: string]: [string | null, string | null, string | null][];
  };
  precipitation: {
    [areaCode: string]: [string | null, string | null, string | null][];
  };
  sunshine: {
    [areaCode: string]: [string | null, string | null, string | null][];
  };
  snowfall: {
    [areaCode: string]: [string | null, string | null, string | null][];
  };
  reportDatetime: string;
  targetDatetime: string;
  targetDuration: string;
  durationType: number;
}

export interface JmaSeasonData extends JmaSeasonDataBase {
  timeDefines: string[];
}

export interface JmaSeason6MData extends JmaSeasonDataBase {
  timeDefines: null;
}
