import React from "react";
import { Button, Image } from "antd";

export const StatusMint = () => {
  return (
    <div>
      <div className="relative flex h-10">
        <div className="font-medium font-normal">
          You can check it in your wallet
        </div>
        <div className="absolute inset-y-0 right-0"></div>
      </div>

      <Image
        className="w-full rounded-xl bg-cover"
        src="https://s3-alpha-sig.figma.com/img/4d4a/e080/49d5c8d73193f3aafec14997243ee699?Expires=1693180800&Signature=G-GJPsiZxGE8Ge2fcNkohZCM4rmvi0a6mdQWtCMjEQct7kF-KLCXBpdfePcN-5qq2kjQxMjsH-HMxFYW-FgpNeg0Z4RjX7ox1j1LXClznw5raX9m9bPCxWACOUbz6ZYcGjhaLgrelfYrryTmqJDs94E~LnGnYGbgtZQ-YZC9spE1L9oVtsTeJ0BC6RwjsryeFBqtPHKgXSJpEH9d-mH9t2VrCXof2go3Sxx8BA30vmp2wTAALCX9bOM3PJemSbDIRHocTrJs8hJ6ljVdK-BC7Z-JhBtt2vdUAzLluplswiPJVhBUXWnwIgQbBgTPm5j2~25~HUi5Kh3TwHwDuJO6-g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
      ></Image>

      <div className="w-full my-7	">
        <Button
          className="w-full rounded-3xl bg-black text-[#FFFFFF] h-12 font-bold"
          onClick={() => {}}
        >
          Share to socials
        </Button>
      </div>
    </div>
  );
};
