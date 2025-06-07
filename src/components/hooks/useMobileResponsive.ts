import { useMediaQuery } from "@mui/material";

const breakpoints: Record<string, string> = {
  mobile: "(max-width: 320px)",
  tablet: "(min-width: 321px) and (max-width: 979px)",
  desktop: "(min-width: 980px) and (max-width: 1279.95px)",
  large: "(min-width: 1280px)",
  small: "(max-width: 959.95px)",
  medium: "(min-width: 960px) and (max-width: 1279.95px)",
};

interface MobileResponsive {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  isSmall: boolean;
  isMedium: boolean;
}

const useMobileResponsive = (): MobileResponsive => {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const isTablet = useMediaQuery(breakpoints.tablet);
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const isLarge = useMediaQuery(breakpoints.large);
  const isSmall = useMediaQuery(breakpoints.small);
  const isMedium = useMediaQuery(breakpoints.medium);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    isSmall,
    isMedium,
  };
};

export default useMobileResponsive;

// import useMobileResponsive from "../hooks/useMobileResponsive";

// const Component = () => {
//   const { isMobile, isTablet, isLarge } = useMobileResponsive();

//   return (
//     <div>
//       {isMobile && <p>Mobile View</p>}
//       {isTablet && <p>Tablet View</p>}
//       {isLarge && <p>Large Screen</p>}
//     </div>
//   );
// };
