import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocationDetail } from "../models/types";
import request from "../axios";
import { useParams } from "react-router";
import { useLocation } from "react-router";

export const AuthContext = createContext({} as AuthContextProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [coordsNow, setCoordsNow] = useState({ log: -1, lat: -1 } as ICoords);
  const [listLocation, setListLocation] = useState([] as Array<LocationDetail>);
  const [listLocationNearBy, setListLocationNearBy] = useState(
    [] as Array<LocationDetail>
  );
  const [locationDetail, setLocationDetail] = useState({} as LocationDetail);
  const { id } = useParams();

  const routerLocation = useLocation();

  const handleGetListLocation = async (valueSearch = "") => {
    const { log, lat } = coordsNow;
    const res = await request.post("location/list", {
      search: valueSearch,
      longitude: log,
      latitude: lat,
      size: 100,
    });
    if (res.status === 200) {
      const resData = res.data;
      setListLocation(resData.locations);
    } else {
      alert(res.data);
    }
  };

  const handleGetListLocationNearBy = async () => {
    const { log, lat } = coordsNow;
    const res = await request.post("location/nearby", {
      longitude: log,
      latitude: lat,
      size: 100,
    });
    if (res.status === 200) {
      const resData = res.data;
      setListLocationNearBy(resData.locations);
    } else {
      alert(res.data);
    }
  };

  const handleGetLocationDetail = async (locationId: string) => {
    const { log, lat } = coordsNow;
    const res = await request.post("location/info", {
      locationId: locationId,
      longitude: log,
      latitude: lat,
    });
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
  }, [id]);

  useEffect(() => {
    setLocationDetail({} as LocationDetail);
  }, [routerLocation]);

  return (
    <AuthContext.Provider
      value={{
        coordsNow: coordsNow,
        listLocationNearBy: listLocationNearBy,
        listLocation: listLocation,
        locationDetail: locationDetail,
        getListLocation: handleGetListLocation,
        getListLocationNearBy: handleGetListLocationNearBy,
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
  listLocationNearBy: Array<LocationDetail>;
  listLocation: Array<LocationDetail>;
  locationDetail: LocationDetail;
  getListLocation: (valueSearch?: string) => void;
  getLocationDetail: (locationId: string) => void;
  getListLocationNearBy: () => void;
}

interface ICoords {
  log: number;
  lat: number;
}
