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
        <div>
          <img src="./Logo.png" alt="" />
        </div>

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
            <div>
              <WalletMultiButton
                style={{
                  width: 130,
                  height: 40,
                  backgroundColor: "black",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 24,
                  fontWeight: "bold",
                  justifyContent: "center",
                  alignItems: "center",
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
