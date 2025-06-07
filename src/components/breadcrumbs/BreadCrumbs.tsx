import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Css } from "../constants/Css";
import Translate from "../typography/Translate";
import Icon from "../icon/Icon";

interface BreadcrumbLink {
  route?: string;
  text: string;
  reportID?: string;
  params?: Record<string, string | number | boolean>; // Optionally used for query strings
}

interface BreadCrumbsProps {
  links: BreadcrumbLink[];
  noBoxPadding?: boolean;
}

const buildUrlWithParams = (
  route: string,
  params?: Record<string, string | number | boolean>,
  reportID?: string
): string => {
  const url = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params || {}).map(([key, value]) => [key, String(value)])
    )
  );
  if (reportID) {
    url.append("openpanel", reportID);
  }

  return `${route}${url.toString() ? `?${url.toString()}` : ""}`;
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  links = [],
  noBoxPadding = false,
}) => {
  if (!links.length) return null;

  return (
    <div
      className={`${!noBoxPadding && Css.Layout.noBoxPadding} ${
        Css.Layout.boxPadding
      } flex items-start lg:items-center flex-col lg:flex-row bg-ui-primary-light shadow-inner`}
    >
      <Translate
        dataKey="Label.YouAreHere"
        className="text-xxs text-ui-black mt-[4px] mr-1"
      />
      <ul className="py-1">
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          const href = link.route
            ? buildUrlWithParams(link.route, link.params, link.reportID)
            : undefined;

          return (
            <Fragment key={`crumb-${index}`}>
              <li
                className={`uppercase text-xxs inline-block font-semibold ${
                  link.route
                    ? "text-ui-primary cursor-pointer"
                    : "text-ui-dark cursor-pointer"
                }`}
              >
                {href ? (
                  <Link to={href}>
                    <Translate dataKey={link.text} />
                  </Link>
                ) : (
                  <span className="inline-block">
                    <Translate dataKey={link.text} />
                  </span>
                )}
              </li>
              {!isLast && (
                <li className="inline-block mx-1.5 !text-ui-primary">
                  <Icon name="ChevronRight" className="!text-ui-primary" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumbs;

// import BreadCrumbs from "../components/breadcrumbs/BreadCrumbs";

// const SamplePage = () => {
//   const breadcrumbLinks = [
//     { route: "/", text: "Label.Home" },
//     { route: "/dashboard", text: "Label.Dashboard" },
//     { text: "Label.CurrentPage" }, // Last item: current page, no route
//   ];

//   return (
//     <div>
//       <BreadCrumbs links={breadcrumbLinks} />
//       {/* Page content goes here */}
//     </div>
//   );
// };

// export default SamplePage;
