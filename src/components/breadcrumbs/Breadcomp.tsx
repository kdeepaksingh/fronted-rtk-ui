import { Fragment } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import colors from "../../color";
import Icon from "../icon/Icon";
import Translate from "../typography/Translate";

const Breadcomp: React.FC = () => {
  const location = useLocation();
  const path: string = location.pathname;

  const currentDate = new Date();
  const formattedDate: string = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  const generateBreadcrumb = (): ReactNode[] => {
    const pathSegments = path.split("/").filter(Boolean);

    return pathSegments.map((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const routePath = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const formattedText = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return (
        <Fragment key={index}>
          <li
            style={{
              display: "inline-block",
              fontSize: "1rem",
              textTransform: "uppercase",
              fontWeight: 600,
              color: isLast ? colors["ui-black"] : colors["ui-blue"],
              cursor: isLast ? "default" : "pointer",
              marginRight: "6px",
            }}
          >
            {isLast ? (
              formattedText
            ) : (
              <Link to={routePath}>{formattedText}</Link>
            )}
          </li>
          {!isLast && (
            <li
              style={{
                display: "inline-block",
                margin: "0 6px",
                color: colors["ui-blue"],
              }}
            >
              <Icon name="ChevronRight" />
            </li>
          )}
        </Fragment>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "0.5rem 1.5rem",
        backgroundColor: "#f1f5f9",
        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: "1rem",
            color: colors["ui-black"],
            marginRight: "0.25rem",
          }}
        >
          <Translate dataKey="Label.YouAreHere" />
        </span>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 0,
            margin: 0,
            listStyle: "none",
          }}
        >
          <li
            style={{
              display: "inline-block",
              fontSize: "1rem",
              textTransform: "uppercase",
              fontWeight: 600,
              color: colors["ui-blue"],
              cursor: "pointer",
              marginRight: "4px",
            }}
          >
            <Link to="/">Dashboard</Link>
          </li>
          {path !== "/" && (
            <li
              style={{
                display: "inline-block",
                margin: "3px 0px 2px 0px",
                color: colors["ui-blue"],
                marginTop: "0px",
              }}
            >
              <Icon name="ChevronRight" />
            </li>
          )}
          {generateBreadcrumb()}
        </ul>
      </div>
      <div
        style={{
          fontSize: "1.5rem",
          color: colors["ui-blue"],
          fontWeight: 500,
        }}
      >
        Date: {formattedDate}
      </div>
    </div>
  );
};

export default Breadcomp;
