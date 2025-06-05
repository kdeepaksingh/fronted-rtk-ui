interface ConfirmAndRedirect {
    (url: string): void;
}

export class RouterUtils {
  static localUrl = `${window.location.protocol}//${window.location.host}`;
  static AssestUrl = `${RouterUtils.localUrl}/assets`;

  static confirmAndRedirect: ConfirmAndRedirect = (url) => {
    const confirmed = window.confirm(
        `This link shall take you to a page outside the ${RouterUtils.localUrl} For any query regarding the contents of the linked page, please contact the webmaster of the concerned website`
    );

    if (confirmed) window.open(url, "_blank");
  };
}
