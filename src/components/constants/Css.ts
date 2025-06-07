import colors from "../../color";

export class Css {
  static boxPadding = "md:px-14 px-6";
  static noBoxPadding = "md:-mx-14 -mx-6";

  static Layout = {
    boxPadding: Css.boxPadding,
    noBoxPadding: Css.noBoxPadding,
    xPadding: "px-6",
    bPadding: "px-12",
    pageContainer: "pb-7",
    sectionPadding: `px-6 py-12`,
    sectionPaddingBlue: `${Css.boxPadding} py-8`,
    cardPadding: "!p-6",
    tPadding: "pt-6",
  };

  static LinkColors = {
    black: colors["ui-black"],
    link: colors["ui-blue"],
  };

  static LinkColor = {
    black: "text-ui-black",
    link: "text-ui-link",
  };

  static TabColors = {
    tab1: "tab-orange",
    tab2: "tab-pink",
    tab3: "tab-green",
    tab4: "tab-orange",
    tab5: "tab-orange",
    tab6: "tab-orange",
  };
}
