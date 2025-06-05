export class StringUtils {
  static getImageName = (url: string): string => {
    const index: number = url.lastIndexOf("/") + 1;
    const imageName: string = url.substr(index);
    return imageName;
  };
}

export default StringUtils;
