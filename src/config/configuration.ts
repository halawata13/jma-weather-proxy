import { ConfigFactory, ConfigObject } from '@nestjs/config';

const configuration: ConfigFactory = () => {
  const config: ConfigObject = {};
  config.DEBUG = false;
  config.jmaUrl = {};
  config.jmaUrl.forecastArea = 'https://www.jma.go.jp/bosai/forecast/const/forecast_area.json';
  config.jmaUrl.weekArea05 = 'https://www.jma.go.jp/bosai/forecast/const/week_area05.json';
  config.jmaUrl.weekAreaName = 'https://www.jma.go.jp/bosai/forecast/const/week_area_name.json';
  config.jmaUrl.area = 'https://www.jma.go.jp/bosai/common/const/area.json';
  config.jmaUrl.forecast = 'https://www.jma.go.jp/bosai/forecast/data/forecast/{FORECAST_CODE}.json';
  config.jmaUrl.twoWeekForecast = 'https://www.data.jma.go.jp/gmd/cpd/twoweek/data/Latest/data_{AREA_CODE}.json';
  config.jmaUrl.seasonForecast = 'https://www.jma.go.jp/bosai/season/data/{RANGE}.json';
  config.jmaUrl.amedas = 'https://www.jma.go.jp/bosai/amedas/data/point/{AMEDAS_CODE}/{DATETIME}.json';
  config.jmaUrl.amedasTable = 'https://www.jma.go.jp/bosai/amedas/const/amedastable.json';

  if (process.env.NODE !== 'production') {
    config.DEBUG = true;
  }

  if ('DUMMY_DATA' in process.env) {
    config.jmaUrl.forecastArea = '/../sample/forecast_area.json';
    config.jmaUrl.weekArea05 = '/../sample/week_area05.json';
    config.jmaUrl.weekAreaName = '/../sample/week_area_name.json';
    config.jmaUrl.area = '/../sample/area.json';
    config.jmaUrl.forecast = '/../sample/{PREF_CODE}0000.json';
    config.jmaUrl.twoWeekForecast = '/../sample/data_47636.json';
    config.jmaUrl.seasonForecast = '/../sample/{RANGE}.json';
    config.jmaUrl.amedas = '/../sample/amedas01.json';
    config.jmaUrl.amedasTable = '/../sample/amedastable.json';
  }

  return config;
};

export default configuration;
