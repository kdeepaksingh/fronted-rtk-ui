export class StringUtils {
  static getImageName = (url: string): string => {
    const index: number = url.lastIndexOf("/") + 1;
    const imageName: string = url.substr(index);
    return imageName;
  };

  static charCount = (text: string | null, space: boolean = false): number =>
    text !== null ? String(text).replace(space ? /\s/g : "", "").length : 0;

  static replaceAllWildCharater = (searchTerm: string): string => {
    const replaceCharaters: string[] = "\\,[,],^,$,.,|,?,*,+,(,)".split(",");

    replaceCharaters.forEach(
      (item: string) =>
        (searchTerm = searchTerm.split(`${item}`).join(`\\${item}`))
    );

    return searchTerm;
  };

  static matchedWords = ({
    sentence,
    searchTerm = "",
  }: {
    sentence: string;
    searchTerm?: string;
  }) => {
    return (
      sentence?.match?.(
        new RegExp(StringUtils.replaceAllWildCharater(searchTerm), "gi")
      ) || []
    )
      .toString()
      .replace(/,/g, "").length;
  };
}

export default StringUtils;
