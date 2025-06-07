import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UseDelayedRedirectProps {
  redirect: string | null;
  delay?: number;
  onRedirect?: (type: string, payload: string) => void;
}

export const useDelayedRedirect = ({
  redirect,
  delay = 0,
  onRedirect = () => {},
}: UseDelayedRedirectProps): number | false => {
  const [redirecting, setRedirecting] = useState<number>(0);
  const navigate = useNavigate();
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (redirect) {
      if (interval.current) {
        clearInterval(interval.current);
      }

      let count = delay;

      if (!count) {
        onRedirect("redirect", "");
        navigate(redirect);
      } else {
        setRedirecting(count);

        interval.current = setInterval(() => {
          count--;
          setRedirecting(count);

          if (count <= 0 && interval.current) {
            clearInterval(interval.current);
            onRedirect("redirect", "");
            navigate(redirect);
          }
        }, 1000);
      }
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [redirect, delay, navigate, onRedirect]);

  return redirect && redirecting > 0 ? redirecting : false;
};

export default useDelayedRedirect;

// import React from "react";
// import useDelayedRedirect from "../hooks/useDelayedRedirect"; // adjust path

// const LogoutSuccess: React.FC = () => {
//   const countdown = useDelayedRedirect({
//     redirect: "/login",     // where to redirect
//     delay: 5,                // delay in seconds
//     onRedirect: (type, payload) => {
//       console.log("Redirecting now:", type, payload);
//     },
//   });

//   return (
//     <div className="text-center p-4">
//       <h2 className="text-xl font-bold">You've been logged out.</h2>
//       {countdown && (
//         <p className="text-sm mt-2 text-gray-600">
//           Redirecting to login in {countdown} second{countdown > 1 ? "s" : ""}...
//         </p>
//       )}
//     </div>
//   );
// };

// export default LogoutSuccess;
