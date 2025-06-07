import Icon from "./Icon";

interface LogoProps {
  //   emblem?: boolean;
  MNG_EMP?: boolean;
  //   info?: boolean;
  //   fontSize?: number;
  //   height?: number;
  //   white?: boolean;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  //   emblem = true,
  MNG_EMP = true,
  //   info = true,
  //   fontSize = 14,
  //   height = 36,
  //   white = false,
  href = "",
}) => {
  const handleClick = () => {
    if (!href) {
      window.location.reload();
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
    >
      {MNG_EMP && (
        <div>
          <Icon
            name="LogoWhiteCompletev3"
            // height={49}
            className="w-full lg:w-auto cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
