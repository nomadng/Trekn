import React, { useEffect, useMemo, useState } from "react";
import { Button, Drawer, Modal, Slider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { WrappedConnection } from "../functions/wrappedConnection";
import { Transaction } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Map from "../components/Map";
import { useParams } from "react-router";
import { DATA } from "./ConnectWallet";
import {
  formatNumber,
  getDistance,
  getStatusLocation,
} from "../utils/common.utils";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { CloseIcon, GroupIcon, SuccessIcon } from "../icons";
import { useWindowSize } from "../hooks/useWindownSize";
import { StatusMint } from "../components/StatusMint";
import { useAuthContext } from "../context/AuthContext";
import { useWallet } from "@solana/wallet-adapter-react";

function Details() {
  const wallet = useAnchorWallet();
  const walletAddress = useWallet();
  const { coordsNow, getLocationDetail, locationDetail } = useAuthContext();
  const apiKey = "a9477f3d-7bd1-4706-bce1-32deb0744759";
  const connectionString = `https://rpc-devnet.helius.xyz?api-key=${apiKey}`;

  const [openMintDrawer, setOpenMintDrawer] = useState(false);
  const [distance, setDistance] = useState(0);
  const [address, setAddress] = useState("");

  const { width } = useWindowSize();
  const { id } = useParams();

  const { status, Icon, label, title } = useMemo(() => {
    return getStatusLocation(distance, locationDetail?.radius);
  }, [distance, locationDetail]);

  const handleGetWalletAddress = () => {
    if (walletAddress.publicKey) {
      setAddress(walletAddress.publicKey?.toString());
    }
  };

  const onCloseMintDrawer = () => {
    setOpenMintDrawer(false);
  };

  const handleClick = async () => {
    setOpenMintDrawer(true);
    try {
      if (wallet) {
        const collection = {
          userPubkey: wallet.publicKey.toString(),
        };

        const response = await axios.post(
          "http://localhost:8080/api/mint-cnft",
          collection
        );

        const transactionBuffer = Buffer.from(
          response.data.transaction,
          "base64"
        );

        const connectionWrapper = new WrappedConnection(
          wallet,
          connectionString
        );

        const transaction = Transaction.from(transactionBuffer);
        const { lastValidBlockHeight } =
          await connectionWrapper.getLatestBlockhash();
        transaction.lastValidBlockHeight = lastValidBlockHeight;

        const tx = await wallet.signTransaction(transaction);
        const serialized = tx.serialize({
          requireAllSignatures: true,
          verifySignatures: true,
        });

        try {
          const signature = await connectionWrapper.sendEncodedTransaction(
            serialized.toString("base64"),
            {
              maxRetries: 5,
              skipPreflight: true,
            }
          );

          return signature;
        } catch (e) {
          console.error("Failed to mint compressed NFT", e);
          throw e;
        }
      }
    } catch (error) {
      console.error("There was an error sending the request", error);
    }
  };

  useEffect(() => {
    handleGetWalletAddress();
  }, [walletAddress]);

  useEffect(() => {
    if (locationDetail && coordsNow) {
      const distance = getDistance(
        coordsNow.lat,
        coordsNow.log,
        locationDetail.latitude,
        locationDetail.longitude
      );
      setDistance(distance);
    }
  }, [locationDetail, coordsNow]);

  useEffect(() => {
    if (id) {
      getLocationDetail(id);
    }
  }, [id]);

  return (
    <>
      <div className="w-full h-auto bg-gradient-to-r from-green-400 to-green-100 px-[16px] pt-[10px] pb-[1px] relative">
        <p className="text-[12px] font-medium">
          Enjoy zero-fee mint for the first 100,000 cNFT
        </p>
        <Slider
          min={0}
          max={100000}
          value={3000}
          handleStyle={{ display: "none" }}
          trackStyle={{ background: "black" }}
          railStyle={{ background: "white" }}
        />
        <CloseIcon className="absolute top-[4px] right-[4px] cursor-pointer" />
      </div>
      <div className="w-auto mb-[88px] px-[20px] sm:px-0">
        <div
          style={{
            backgroundImage:
              width > 600
                ? "url('https://vapa.vn/wp-content/uploads/2022/12/anh-canh-dep-001-1.jpg')"
                : "",
          }}
          className="mb-[40px] w-full bg-cover flex sm:items-center sm:justify-center sm:h-[264px] sm:mb-[60px]"
        >
          <div className="max-w-[870px] sm:w-[870px] sm:ml-auto sm:mr-auto">
            <div className="sm:mb-6 w-full text-black sm:text-white">
              <div className="w-[130px] mt-[10px] font-medium	text-xs rounded-[60px] h-6 flex justify-center items-center border-[1px] border-solid border-black sm:border-white">
                <Icon stroke="white" />
                <div className="ml-1">{label}</div>
              </div>

              <div className="mt-3 text-[34px] font-bold font-sans">
                {locationDetail?.name}
              </div>
              <div className="mt-3 flex text-xs font-medium">
                <p>{`${locationDetail?.address} • ${formatNumber(
                  locationDetail?.nftMintedCount
                )} minted`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[870px] ml-auto mr-auto">
          <div className="mb-[60px]">
            <div className="flex items-center mb-[24px]">
              <GroupIcon />
              <p className="font-bold text-[28px] ml-[10px]">{title}</p>
            </div>
            <div
              className="rounded-xl mb-10"
              style={{
                width: "100%",
                height: 335,
              }}
            >
              {coordsNow && (
                <Map data={locationDetail!} coordsNow={coordsNow} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[24px] items-start sm:grid-cols-2 ">
            <div>
              <Carousel
                showArrows={true}
                emulateTouch={true}
                dynamicHeight={true}
                showStatus={false}
                showThumbs={false}
              >
                {locationDetail?.locationPhotos?.map((currentSlide, index) => (
                  <img src={currentSlide.photoLink} alt="" key={index} />
                ))}
              </Carousel>
            </div>

            <div>
              <div className="text-base text-[#71717A] w-[100%] mb-3">
                According to the legend, after defeating the Ming China, Emperor
                Lê Lợi was boating on the lake when a Golden Turtle God (Kim
                Qui) surfaced and asked for his magic sword, Heaven's Will.
                <br />
                <br />
                Lợi concluded that Kim Qui had come to reclaim the sword that
                its master, a local ...
              </div>

              <div className="flex w-full font-semibold text-base	text-[#00A868] mb-10">
                View more
              </div>

              <div className="w-full mb-12">
                <Button
                  className="h-12 rounded-3xl w-full flex items-center justify-center text-base font-bold bg-black text-white mb-[12px]"
                  onClick={() => handleClick()}
                  disabled={status === "readyToMint" ? false : true}
                >
                  Mint proof
                </Button>
                <Button
                  className="h-12 rounded-3xl w-full flex items-center justify-center text-base font-bold bg-black text-white"
                  disabled
                >
                  Mint all collections
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {width >= 600 ? (
        <Modal
          title={
            <div className="flex items-center">
              <SuccessIcon />
              <div className="text-2xl font-bold ml-[10px]">
                Minted successfull
              </div>
            </div>
          }
          open={openMintDrawer}
          okText={""}
          width={508}
          footer={null}
          onCancel={() => setOpenMintDrawer(false)}
        >
          <StatusMint />
        </Modal>
      ) : (
        <Drawer
          title={
            <div className="flex items-center">
              <SuccessIcon />
              <div className="text-2xl font-bold ml-[10px]">
                Minted successfull
              </div>
            </div>
          }
          className="rounded-t-3xl"
          placement={"bottom"}
          closable={false}
          height={560}
          onClose={onCloseMintDrawer}
          open={openMintDrawer}
          extra={
            <div
              className="w-7 h-7 bg-[#F2F2F7] flex justify-center items-center rounded-full z-50 cursor-pointer"
              onClick={() => setOpenMintDrawer(false)}
            >
              <CloseOutlined />
            </div>
          }
        >
          <StatusMint />
        </Drawer>
      )}
    </>
  );
}

export default Details;
