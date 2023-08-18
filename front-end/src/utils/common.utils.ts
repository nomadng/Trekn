import { AwayIcon, MileageIcon, ReadyToMintIcon } from "../icons";

export const getStatusLocation = (distance: number, radius = 500) => {
    const radiusInKm = radius / 1000;

    if (distance - radiusInKm <= 0) {
      return { status: "readyToMint", Icon: ReadyToMintIcon, label: "Ready to mint", title: "You've entered the zone!" };
    } else {
      if (distance - radiusInKm > 0 && distance - radiusInKm < 50) {
          return {
                status: "nearBy",
                Icon: AwayIcon,
              label: `${Number((distance - radiusInKm).toFixed(2)) < 1 ? `${((distance - radiusInKm) * 1000).toFixed(2)}m` : `${(distance - radiusInKm).toFixed(2)}km`} away`,
              title:`${Number((distance - radiusInKm).toFixed(2)) < 1 ? `${((distance - radiusInKm) * 1000).toFixed(2)}m` : `${(distance - radiusInKm).toFixed(2)}km`} away`
        };
      } else {
        return { status: "mileageAway",Icon: MileageIcon, label: "Mileage away" ,title: "Mileage away"};
      }
    }
}

export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    var R = 6371;
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lng2 - lng1) * Math.PI) / 180;
    var a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    return R * 2 * Math.asin(Math.sqrt(a));
};
  
export const formatNumber = (
    numberValue?: number,
    maximumFractionDigits = 3,
    fallbackLabel = "",
    localeOption = {},
    minimumFractionDigits = 0,
  ) => {
    try {
      if (!numberValue && numberValue !== 0) return fallbackLabel;
      const num = Number(numberValue);
      return num.toLocaleString("en-US", {
        maximumFractionDigits,
        minimumFractionDigits,
        ...localeOption,
      });
    } catch (error) {
      return String(numberValue);
    }
};