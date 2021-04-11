import { useLocation } from "react-router-dom";

export const useHideHeader = () => {
  const location = useLocation();
  return location.pathname.startsWith("/movie");
};
