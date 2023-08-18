import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getDistance, getStatusLocation } from "../utils/common.utils";
import { CardDetail } from "../models/types";

export const DetailCard = ({ data }: DetailCardProps) => {
  const navigate = useNavigate();
  const [coordsNow, setCoordsNow] = useState({ log: 0, lat: 0 });
  const [distance, setDistance] = useState(0);

  const { Icon, label, status } = useMemo(() => {
    return getStatusLocation(distance, data?.radius);
  }, [distance, data]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setCoordsNow({ log: longitude, lat: latitude });
      }
    );
  }, []);

  useEffect(() => {
    const distance = getDistance(
      coordsNow.lat,
      coordsNow.log,
      data?.latitude,
      data?.longitude
    );
    setDistance(distance);
  }, [data, coordsNow]);

  return (
    <div
      className="w-full border-solid border-2 rounded-xl relative my-2 bg-cover md:bg-cover cursor-pointer"
      style={{
        height: status === "readyToMint" ? 338 : 193,
        backgroundImage: `url(${data.photoLink})`,
      }}
      onClick={() => {
        navigate(`/details/${data._id}`);
      }}
    >
      <div className="flex w-auto h-8 m-3 items-center justify-center text-sm text-white rounded-[60px] border-[1px] border-solid border-white absolute px-[12px] backdrop-blur">
        <Icon style={{ marginRight: "5px" }} />
        <div>{label}</div>
      </div>
      <div className="flex-col absolute bottom-0 left-0 m-4 text-white">
        <div className="font-semibold	text-xl">{data?.name}</div>
        <div className="text-sm font-medium	">{data?.address}</div>
      </div>
      {status === "readyToMint" && (
        <div className="w-auto h-[40px] flex flex-row items-center justify-center absolute bottom-[28px] right-[16px] bg-white px-[20px] rounded-[32px]">
          <img src="./pin-icon.png" alt="" className="w-[20px] h-[20px]" />
          <p className="text-[14px]">Go to mint</p>
        </div>
      )}
    </div>
  );
};

export interface DetailCardProps {
  data: CardDetail;
}
