/* eslint-disable react-hooks/exhaustive-deps */
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey !== null) {
      navigate("/home");
    } else {
      navigate("/connect-wallet");
    }
  }, [publicKey]);

  return (
    <>
      <div className="m-5 flex items-center justify-between">
        <a href="/home">
          <img src="./Logo.png" alt="" />
        </a>

        <div>
          {publicKey ? (
            <div>
              <WalletMultiButton
                startIcon={undefined}
                style={{
                  width: 106,
                  height: 40,
                  backgroundColor: "white",
                  color: "#00A868",
                  fontSize: 12,
                  borderRadius: 24,
                  fontWeight: "bold",
                  justifyContent: "center",
                  paddingRight: 35,
                  alignItems: "center",
                  border: "1px solid #00A868",
                }}
              />
            </div>
          ) : (
            <div className="w-[130px] h-[40px] relative bg-black  items-center justify-center rounded-3xl bg-[#00A868] text-white text-base font-semibold px-[32px] overflow-hidden flex">
              <p className="absolute text-[12px] font-bold">Connect wallet </p>
              <WalletMultiButton
                style={{
                  width: "130px",
                  position: "absolute",
                  top: "-25px",
                  left: "-65px",
                  opacity: 0,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
