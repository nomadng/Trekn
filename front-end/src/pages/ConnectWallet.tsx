/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ListDetail } from "../components/ListDetail";
import { useWindowSize } from "../hooks/useWindownSize";
import { useAuthContext } from "../context/AuthContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

function ConnectWallet() {
  const { width } = useWindowSize();
  const { getListLocation, listLocation, coordsNow } = useAuthContext();

  useEffect(() => {
    getListLocation();
  }, [coordsNow]);

  return (
    <>
      <div className="w-full px-[20px] sm:px-0 ">
        <div
          className="w-full sm:h-[704px] flex items-end bg-cover mt-[40px]"
          style={{
            backgroundImage:
              width >= 640
                ? "url('https://vapa.vn/wp-content/uploads/2022/12/anh-canh-dep-001-1.jpg')"
                : "",
          }}
        >
          <div className="max-w-[673px]  flex flex-col rounded-tr-[24px] sm:h-[336px] sm:bg-white sm:py-[40px] sm:pl-[142px] sm:pr-[48px] ">
            <div className="text-[34px] font-bold">
              Explore the world with NFTrip!
            </div>
            <div className="text-base text-[#71717A] font-medium">
              NFTrip is a new way to prove your travels and collect memories
              that last a lifetime! With our app, you can mint unique cNFTs as
              proof of your travels and share them with friends and family.
              Collect cNFTs from all the places you've visited and show off your
              adventures to the world!
            </div>
            <div className="w-full h-[48px] relative items-center justify-center rounded-3xl bg-[#00A868] text-white text-base font-semibold px-[32px] mt-[25px] hidden sm:flex">
              <p className="absolute">Connect wallet to start explore</p>
              <WalletMultiButton
                style={{
                  width: "490px",
                  position: "absolute",
                  top: "-25px",
                  left: "-240px",
                  opacity: 0,
                }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-[870px] ml-auto mr-auto mb-10">
          <div className=" text-base font-semibold mt-[25px]">
            Popular minted locations
          </div>
          <ListDetail data={listLocation} />
          <div className="w-full h-[48px] relative items-center justify-center rounded-3xl bg-[#00A868] text-white text-base font-semibold px-[32px] mt-[24px] flex sm:hidden">
            <p className="absolute">Connect wallet to start explore</p>
            <WalletMultiButton
              style={{
                width: "490px",
                position: "absolute",
                top: "-25px",
                left: "-240px",
                opacity: 0,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectWallet;
