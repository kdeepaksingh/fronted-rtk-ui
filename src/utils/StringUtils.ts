export class StringUtils {
static getImageName = (url: string): string => {
    var index: number = url.lastIndexOf("/") + 1;
    var imageName: string = url.substr(index);
    return imageName;
};
}

export default StringUtils;
