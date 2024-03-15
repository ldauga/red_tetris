import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useHashRouter = ():[string, React.Dispatch<React.SetStateAction<string>>] => {
  const [hash, setHash] = useState<string>(window.location.hash);
  const location = useLocation()

  useEffect(() => {
    setHash(location.hash)
  }, [location]);

  return [ hash, setHash ];
}

export default useHashRouter;