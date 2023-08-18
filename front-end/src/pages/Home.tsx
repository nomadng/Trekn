import React, { useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import { ListDetail } from "../components/ListDetail";
import { getDistance, getStatusLocation } from "../utils/common.utils";
import { DetailCard } from "../components/DetailCard";
import { CardDetail } from "../models/types";
import { SearchIcon } from "./../icons";
import { useWindowSize } from "../hooks/useWindownSize";
import { useAuthContext } from "../context/AuthContext";

function Home() {
  const { getListLocation, coordsNow, listLocation } = useAuthContext();
  const [valueFilter, setValueFilter] = useState("");

  const { width } = useWindowSize();

  const dataPopular = useMemo(() => {
    return (
      listLocation && listLocation.filter((item) => item.nftMintedCount > 40)
    );
  }, [listLocation]);

  const dataNearby = listLocation.filter((item) => {
    const distance = getDistance(
      coordsNow.lat,
      coordsNow.log,
      item.latitude,
      item.longitude
    );
    const { status } = getStatusLocation(distance, item.radius);
    return status === "nearBy";
  });

  const dataReadyToMint = listLocation.find((item) => {
    const distance = getDistance(
      coordsNow.lat,
      coordsNow.log,
      item.latitude,
      item.longitude
    );
    const { status } = getStatusLocation(distance, item.radius);
    return status === "readyToMint";
  });

  useEffect(() => {
    getListLocation(valueFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueFilter]);

  return (
    <div className="w-full px-[20px] sm:px-0">
      <div>
        <div
          className="mb-[60px] w-full sm:h-[264px] bg-cover flex items-center justify-center "
          style={{
            backgroundImage:
              width > 600
                ? `url('https://vapa.vn/wp-content/uploads/2022/12/anh-canh-dep-001-1.jpg')`
                : "",
          }}
        >
          <div className="max-w-[870px] sm:w-[870px] sm:ml-auto sm:mr-auto ">
            <div className="sm:w-[335px]">
              <p className="text-[34px] font-bold text-black sm:text-white">
                Enjoy your trip in Hanoi!
              </p>
              <Input
                size="large"
                placeholder="Search any location..."
                suffix={<SearchIcon />}
                className="h-14 rounded-3xl w-full rounded-[99px] "
                onChange={(e) => setValueFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[870px] ml-auto mr-auto">
        {valueFilter ? (
          <ListDetail data={listLocation} />
        ) : (
          <>
            {dataReadyToMint && (
              <div className="mb-10">
                <DetailCard data={dataReadyToMint as CardDetail} />
              </div>
            )}
            <div className="mb-10">
              <div className="text-base font-semibold">Nearby</div>
              <ListDetail data={dataNearby} />
            </div>

            <div className="mb-10">
              <div className="text-base font-semibold">
                Popular minted locations
              </div>
              <ListDetail data={dataPopular} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
