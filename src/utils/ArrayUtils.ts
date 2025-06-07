export class ArrayUtils {
  static addWhen = (
    data: unknown,
    add: boolean = false,
    arrayParse: boolean = true,
    elseGive?: unknown
  ): unknown => {
    if (!add) {
      if (elseGive) return elseGive;

      return arrayParse ? [] : {};
    }

    return arrayParse && !Array.isArray(data) ? [data] : data;
  };
}
