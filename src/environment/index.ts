class Environment {
  static APIURI: string = import.meta.env.VITE_API_BASE_URL as string;

  static ModuleToArray(modules: string): string[] {
    return modules.split(",").map((mod) => (mod === "*" ? mod : "/" + mod));
  }
}

export default Environment;
