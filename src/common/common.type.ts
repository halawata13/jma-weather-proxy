export interface JmaForecastArea {
  [areaCode: string]: {
    class10: string;
    amedas: string[];
    class20: string;
  }[];
}

export interface JmaWeekArea05 {
  [areaCode: string]: string[];
}

export interface JmaWeekAreaName {
  [areaCode: string]: {
    jp: string;
    en: string;
  };
}

export interface JmaArea {
  centers: {
    [areaCode: string]: {
      name: string;
      enName: string;
      officeName: string;
      children: string[];
    };
  };
  offices: {
    [areaCode: string]: {
      name: string;
      enName: string;
      officeName: string;
      parent: string;
      children: string[];
    };
  };
  class10s: {
    [areaCode: string]: {
      name: string;
      enName: string;
      parent: string;
      children: string[];
    };
  };
  class15s: {
    [areaCode: string]: {
      name: string;
      enName: string;
      parent: string;
      children: string[];
    };
  };
  class20s: {
    [areaCode: string]: {
      name: string;
      enName: string;
      kana: string;
      parent: string;
    };
  };
}
