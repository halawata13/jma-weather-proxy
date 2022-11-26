export type JmaTwoWeekData = {
  No: number;
  reportDate: {
    yy: number;
    mm: number;
    dd: number;
    hh: number;
  };
  today: [
    {
      yy: number;
      mm: number;
      dd: number;
    },
  ];
  obs: {
    yy: number;
    mm: number;
    dd: number;
    elem: number;
    ku2: number;
    ku3: number;
    ku4: number;
    ku5: number;
    nrm: number;
    obs: number;
    rank: number;
  }[];
  wk1: {
    yy: number;
    mm: number;
    dd: number;
    elem: number;
    ku2: number;
    ku3: number;
    ku4: number;
    ku5: number;
    nrm: number;
    fcst: number;
    rank: number;
    lower?: number;
    upper?: number;
  }[];
  wk2: {
    yy: number;
    mm: number;
    dd: number;
    elem: number;
    ku2: number;
    ku3: number;
    ku4: number;
    ku5: number;
    nrm: number;
    fcst: number;
    rank: number;
    lower: number;
    upper: number;
  }[];
};
