class Environment {
  static APIURI: string = import.meta.env.VITE_API_BASE_URL as string;
  static BASEURI: string = import.meta.env.VITE_BASE_URL as string;
  static isLocal = String(window.location.host).includes("localhost");
  static PUBLIC_URI: string = import.meta.env.PUBLIC_URL as string;

  // static FERNET = process.env.REACT_APP_FERNET;
  // static SupersetUser = "admin";
  // static DashReportUrl = process.env.REACT_APP_DASH_REPORT_URL;
  // static isProduction = process.env.REACT_APP_ENV === "PRODUCTION";
  // static isStaging = process.env.REACT_APP_ENV === "STAGING";
  // static isLocal = String(window.location.host).includes("localhost");
  // static isDev = !Environment.isProduction && !Environment.isStaging;
  // static BuildDate = preval`module.exports = new Date();`;
  // static MapUrl = Environment.isProduction
  //   ? `${RouterUtils.localUrl}/india`
  //   : `${process.env.REACT_APP_MAP_URL}`;
  // static WADHWANIAI = process.env.REACT_APP_WADHWANIAI_URL;
  // static OPENAPI = "https://data.upag.gov.in/redoc";

  static ModuleToArray(modules: string): string[] {
    return modules.split(",").map((mod) => (mod === "*" ? mod : "/" + mod));
  }
}

export default Environment;
