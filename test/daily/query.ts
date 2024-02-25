export default function getQuery(areaCode: string) {
  return `
  daily(areaCode: "${areaCode}") {
    reportDatetime
    items {
      date
      weatherCode
      jmaWeatherImgCode
      wind
      wave
      pop
      tempMin
      tempMax
    }
    areaCode
    areaName
  }
  `;
}
