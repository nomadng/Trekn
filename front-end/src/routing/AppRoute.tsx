import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ConnectWallet from "../pages/ConnectWallet";
import Details from "../pages/Details";
import Header from "../components/Header";

const AppRoutes = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route
        path="/"
        element={
          <App
            layout={ConnectWallet}
            header={Header}
            required_connect_wallet={false}
          />
        }
      >
        <Route path="connect-wallet" element={<ConnectWallet />} />
      </Route>

      <Route
        path="/home"
        element={
          <App required_connect_wallet={true} header={Header} layout={Home} />
        }
      ></Route>

      <Route
        path="/details/:id"
        element={
          <App
            required_connect_wallet={true}
            header={Header}
            layout={Details}
          />
        }
      ></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
