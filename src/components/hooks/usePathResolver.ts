import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import StringUtils from "../../utils/StringUtils";
import PrivateRoutes from "../../routes/PrivateRoutes";

interface RouteItem {
  path: string;
  children?: RouteItem[];
  pagePermission?: string;
  mustHaveActions?: string[];
  p?: string;
  a?: string[];
  fullScreen?: boolean;
}

interface MatchedPath {
  path: string;
  pagePermission?: string;
  mustHaveActions: string[];
  fullScreen: boolean;
}

/**
 * Extracts clean path segments from a pathname.
 */
const getOnlyPaths = (pathname: string): string[] => {
  return (
    StringUtils.replaceFirstSlash(pathname)
      .split("?")[0]
      .split("/")
      .filter((i) => i) || []
  );
};

/**
 * Recursively searches for a matching route in privateRoutes.
 */
export const SearchPrivatePaths = (pathname: string): MatchedPath | object => {
  const targetPath = getOnlyPaths(pathname);
  let matchedPath: MatchedPath | object = {};

  const searchPath = (children: RouteItem[] = [], parents: string[] = []) => {
    return children.every((item) => {
      const newParents = [...parents];

      if (item.children?.length) {
        if (item.path) {
          const p = StringUtils.replaceFirstSlash(item.path).split("/")[0];
          if (p) newParents.push(p);
        }

        return searchPath(item.children, newParents);
      } else {
        const path = item.path;
        const matchPath = StringUtils.replaceFirstSlash(path).split("/");

        const isMatch = [...newParents, ...matchPath].every(
          (r, i) => r === targetPath[i] || r.includes(":")
        );

        if (isMatch) {
          matchedPath = {
            path: item.path,
            pagePermission: item.pagePermission || item.p,
            mustHaveActions: item.mustHaveActions || item.a || [],
            fullScreen: Boolean(item.fullScreen),
          };
          return false;
        }
      }

      return true;
    });
  };

  searchPath(PrivateRoutes.children);

  return matchedPath;
};

/**
 * Hook that resolves the matched path data from the current route.
 */
export const usePathResolver = (): MatchedPath | {} => {
  const { pathname } = useLocation();

  return useMemo(() => {
    return SearchPrivatePaths(pathname);
  }, [pathname]);
};
