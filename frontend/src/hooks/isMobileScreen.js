import { useState, useEffect } from "react";

export const BREAKPOINTS = {
  laptop: 1280,
  tablet: 750,
  mobile: 480,
};

const useDeviceType = () => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useDeviceType;
