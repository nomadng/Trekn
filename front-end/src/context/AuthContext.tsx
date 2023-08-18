import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CardDetail } from "../models/types";
import request from "../axios";

export const AuthContext = createContext({} as AuthContextProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [coordsNow, setCoordsNow] = useState({} as ICoords);
  const [listLocation, setListLocation] = useState([] as Array<CardDetail>);
  const [locationDetail, setLocationDetail] = useState({} as CardDetail);

  const handleGetListLocation = async (valueSearch = "") => {
    const res = await request.post("location/list", { search: valueSearch });
    if (res.status === 200) {
      const resData = res.data;
      setListLocation(resData.locations);
    } else {
      alert(res.data);
    }
  };

  const handleGetLocationDetail = async (locationId: string) => {
    const res = await request.post("location/info", { locationId: locationId });
    if (res.status === 200) {
      const resData = res.data;
      setLocationDetail(resData);
    } else {
      alert(res.data);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setCoordsNow({ log: longitude, lat: latitude });
      }
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        coordsNow: coordsNow,
        listLocation: listLocation,
        locationDetail: locationDetail,
        getListLocation: handleGetListLocation,
        getLocationDetail: handleGetLocationDetail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  coordsNow: ICoords;
  listLocation: Array<CardDetail>;
  locationDetail: CardDetail;
  getListLocation: (valueSearch?: string) => void;
  getLocationDetail: (locationId: string) => void;
}

interface ICoords {
  log: number;
  lat: number;
}
