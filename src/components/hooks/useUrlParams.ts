import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Hook to update the URL search parameters while preserving previous ones.
 */
export const useUrlParams = (): ((q: Record<string, string>) => void) => {
  const [params, setParams] = useSearchParams();

  const previousParams = useMemo(() => {
    const allParams: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      allParams[key] = value;
    }
    return allParams;
  }, [params]);

  return useCallback(
    (q: Record<string, string>) => {
      setParams({ ...previousParams, ...q });
    },
    [previousParams, setParams]
  );
};

/**
 * Converts object to query string manually.
 */
const objectToQueryParams = (params: Record<string, string>): string => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

/**
 * Hook to get the current URL query parameters as a query string.
 */
export const useUrlQueryParams = (): string => {
  const [params] = useSearchParams();

  const currentParams = useMemo(() => {
    const allParams: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      allParams[key] = value;
    }
    return allParams;
  }, [params]);

  return objectToQueryParams(currentParams);
};
