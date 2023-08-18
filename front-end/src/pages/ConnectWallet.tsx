import React from "react";
import TestimonialCard from "../components/TestimonialCard";
import { Button } from "antd";
import { ListDetail } from "../components/ListDetail";
import { useWindowSize } from "../hooks/useWindownSize";
require("@solana/wallet-adapter-react-ui/styles.css");

function ConnectWallet() {
  const { width } = useWindowSize();
  const data = DATA.filter((item) => item.nftMintedCount > 40);

  return (
    <>
      <div className="w-full px-[20px] sm:px-0 ">
        <div
          className="w-full sm:h-[704px] flex items-end bg-cover mt-[40px]"
          style={{
            backgroundImage:
              width > 600
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
            <Button className="w-auto h-12 rounded-3xl bg-[#00A868] text-white text-base font-semibold mb-12 px-[32px] mt-[16px] hidden sm:block">
              Connect wallet to start explore
            </Button>
          </div>
        </div>

        <div className="max-w-[870px] ml-auto mr-auto mb-10">
          <div className="">
            <div className="flex-[0_0_83%] md:flex-[0_0_50%]">
              <TestimonialCard />
            </div>
          </div>
          <div className=" text-base font-semibold">
            Popular minted locations
          </div>
          <ListDetail data={data} />
          <Button className="w-full h-12 rounded-3xl bg-[#00A868] text-white text-base font-semibold mb-12 sm:hidden">
            Connect wallet to start explore
          </Button>
        </div>
      </div>
    </>
  );
}

export default ConnectWallet;

export const DATA = [
  {
    _id: "64de27ceb98594a86147eed1",
    collectionId: "64de27ceb98594a86147eec9",
    collectionName: "vietnam collection",
    nationId: "64de27ceb98594a86147eecc",
    name: "Hoan Kiem Lake",
    address: "Ha Noi, Viet Nam",
    longitude: 105.85260073109312,
    latitude: 21.028995045040713,
    radius: 2000,
    description: "",
    shortDescription: "",
    nftMintedCount: 50,
    isDeleted: false,
    __v: 0,
    createdAt: "2023-08-17T13:59:42.897Z",
    updatedAt: "2023-08-17T13:59:42.897Z",
    photoLink: "https://www.lasinfoniadelreyhotel.com/img/gallery/guom-22.gif",
    photoRarity: 3,
    photoAuthor: "",
  },
  {
    _id: "64de27ceb98594a86147eed2",
    collectionId: "64de27ceb98594a86147eec9",
    collectionName: "vietnam collection",
    nationId: "64de27ceb98594a86147eecc",
    name: "Old Quarter",
    address: "Ha Noi, Viet Nam",
    longitude: 105.85066898321513,
    latitude: 21.034239231502863,
    radius: 2000,
    description: "",
    shortDescription: "",
    nftMintedCount: 50,
    isDeleted: false,
    __v: 0,
    createdAt: "2023-08-17T13:59:42.897Z",
    updatedAt: "2023-08-17T13:59:42.897Z",
    photoLink:
      "https://hanoioldquarter.info/wp-content/uploads/2018/02/stock-photo-155026169-741x486.jpg",
    photoRarity: 3,
    photoAuthor: "",
  },
  {
    _id: "64de27ceb98594a86147eed3",
    collectionId: "64de27ceb98594a86147eec9",
    collectionName: "vietnam collection",
    nationId: "64de27ceb98594a86147eecc",
    name: "MAC plaza",
    address: "Ha Noi, Viet Nam",
    longitude: 105.79159330040682,
    latitude: 20.983669957972037,
    radius: 2000,
    description: "",
    shortDescription: "",
    nftMintedCount: 50,
    isDeleted: false,
    __v: 0,
    createdAt: "2023-08-17T13:59:42.897Z",
    updatedAt: "2023-08-17T13:59:42.897Z",
    photoLink:
      "https://static.doanhnhan.vn/images/upload/tapchidnpl/12182021/img_20211209_024745.jpg",
    photoRarity: 5,
    photoAuthor: "",
  },
  {
    _id: "64de27ceb98594a86147eed5",
    collectionId: "64de27ceb98594a86147eec9",
    collectionName: "vietnam collection",
    nationId: "64de27ceb98594a86147eecc",
    name: "Ho Tay Lake",
    address: "Ha Noi, Viet Nam",
    longitude: 105.817571,
    latitude: 21.054727,
    radius: 2000,
    description: "",
    shortDescription: "",
    nftMintedCount: 40,
    isDeleted: false,
    __v: 0,
    createdAt: "2023-08-17T13:59:42.897Z",
    updatedAt: "2023-08-17T13:59:42.897Z",
    photoLink:
      "https://www.itourvn.com/images/easyblog_articles/914/Tay-Ho-district-in-Hanoi.jpg",
    photoRarity: 5,
    photoAuthor: "",
  },
  {
    _id: "64de27ceb98594a86147eed6",
    collectionId: "64de27ceb98594a86147eec9",
    collectionName: "vietnam collection",
    nationId: "64de27ceb98594a86147eecc",
    name: "Sam Son Beach",
    address: "Thanh Hoa, Ha Noi",
    longitude: 105.90795198485591,
    latitude: 19.74604365520222,
    radius: 2000,
    description: "",
    shortDescription: "",
    nftMintedCount: 40,
    isDeleted: false,
    __v: 0,
    createdAt: "2023-08-17T13:59:42.897Z",
    updatedAt: "2023-08-17T13:59:42.897Z",
    photoLink:
      "https://vietnamtrips.com/files/photos/article1147/sam-son-1.jpg",
    photoRarity: 5,
    photoAuthor: "",
  },
  {
    _id: "64de27ceb98594a86147eed6",
    collectionId: "64de27ceb98594a86147eec9",
    collectionName: "vietnam collection",
    nationId: "64de27ceb98594a86147eecc",
    name: "Sam Son Beach",
    address: "Thanh Hoa, Ha Noi",
    longitude: 105.90795198485591,
    latitude: 19.74604365520222,
    radius: 2000,
    description: "",
    shortDescription: "",
    nftMintedCount: 40,
    isDeleted: false,
    __v: 0,
    createdAt: "2023-08-17T13:59:42.897Z",
    updatedAt: "2023-08-17T13:59:42.897Z",
    photoLink:
      "https://vietnamtrips.com/files/photos/article1147/sam-son-1.jpg",
    photoRarity: 5,
    photoAuthor: "",
  },
];
