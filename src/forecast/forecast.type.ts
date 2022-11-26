export type JmaForecastData = [
  {
    publishingOffice: string;
    reportDatetime: string;
    timeSeries: [
      {
        timeDefines: string[];
        areas: {
          area: {
            name: string;
            code: string;
          };
          weatherCodes: string[];
          weathers: string[];
          winds: string[];
          waves: string[];
        }[];
      },
      {
        timeDefines: string[];
        areas: {
          area: {
            name: string;
            code: string;
          };
          pops: string[];
        }[];
      },
      {
        timeDefines: string[];
        areas: {
          area: {
            name: string;
            code: string;
          };
          temps: string[];
        }[];
      },
    ];
  },
  {
    publishingOffice: string;
    reportDatetime: string;
    timeSeries: [
      {
        timeDefines: string[];
        areas: {
          area: {
            name: string;
            code: string;
          };
          weatherCodes: string[];
          pops: string[];
          reliabilities: string[];
        }[];
      },
      {
        timeDefines: string[];
        areas: {
          area: {
            name: string;
            code: string;
          };
          tempsMin: string[];
          tempsMinUpper: string[];
          tempsMinLower: string[];
          tempsMax: string[];
          tempsMaxUpper: string[];
          tempsMaxLower: string[];
        }[];
      },
    ];
    tempAverage: {
      areas: {
        area: {
          name: string;
          code: string;
        };
        min: string;
        max: string;
      }[];
    };
    precipAverage: {
      areas: {
        area: {
          name: string;
          code: string;
        };
        min: string;
        max: string;
      }[];
    };
  },
];
