/* eslint-disable @typescript-eslint/no-explicit-any */
import _set from "lodash/set";
import _get from "lodash/get";
import { v4 } from "uuid";

export class Storage {
  static generateSessionID(): string {
    return v4();
  }

  static sessionID(): string {
    let id = Storage.getData<string>("sessionID", "");

    if (!id) {
      id = Storage.generateSessionID();
      Storage.setData("sessionID", id);
    }

    return id;
  }

  static engine(): Storage {
    return localStorage;
  }

  static removeFromObject(key: string, dataKey: string): void {
    Storage.addToObject(key, dataKey, undefined);
  }

  static getFromObject<T = any>(
    key: string,
    dataKey: string,
    empty: T = [] as any
  ): T {
    const obj = Storage.getData<Record<string, any>>(key, {});
    return _get(obj, dataKey, empty);
  }

  static addToObject<T = any>(
    key: string,
    dataKey: string,
    data: T
  ): Record<string, any> {
    const obj = Storage.getData<Record<string, any>>(key, {});
    _set(obj, dataKey, data);
    Storage.setData(key, obj);
    return obj;
  }

  static setData<T = any>(key: string, value: T): void {
    Storage.engine().setItem(key, Storage.valueToString(value));
  }
  setItem(key: string, arg1: string) {
    throw new Error("Method not implemented.");
  }

  static getData<T = any>(key: string, defaultValue: T): T {
    const raw = Storage.engine().getItem(key);
    const restored = Storage.restoreValue(raw);
    return (
      restored === undefined || restored === null ? defaultValue : restored
    ) as T;
  }
  getItem(key: string) {
    throw new Error("Method not implemented.");
  }

  static valueToString(value: any): string {
    const type = typeof value;

    switch (type) {
      case "function":
        return value.toString();
      case "object":
        return JSON.stringify(value || {});
      default:
        return String(value);
    }
  }

  static restoreValue(value: string | null): any {
    if (typeof value === "string") {
      if (value === "true") return true;
      if (value === "false") return false;
      if (!isNaN(Number(value))) return Number(value);

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    return value;
  }

  static removeData(key: string): void {
    Storage.engine().removeItem(key);
  }
  removeItem(key: string) {
    throw new Error("Method not implemented.");
  }

  static destroy(): void {
    const id = Storage.sessionID();
    Storage.engine().clear();
    Storage.engine().setItem("previous_sessionID", id);
  }
  clear() {
    throw new Error("Method not implemented.");
  }
}

export default Storage;
