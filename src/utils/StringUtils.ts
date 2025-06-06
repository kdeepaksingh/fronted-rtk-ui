export class StringUtils {
  static getImageName = (url: string): string => {
    const index: number = url.lastIndexOf("/") + 1;
    const imageName: string = url.substr(index);
    return imageName;
  };

  static charCount = (text: string | null, space: boolean = false): number =>
    text !== null ? String(text).replace(space ? /\s/g : "", "").length : 0;
}

export default StringUtils;
