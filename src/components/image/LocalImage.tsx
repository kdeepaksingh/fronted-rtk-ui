import Image from "./Image";

// Utility to get the current URL with a route
// eslint-disable-next-line react-refresh/only-export-components
export const currentUrl = ({ route = "" }: { route?: string } = {}): string =>
  window.location.protocol +
  "//" +
  `${window.location.host}/${route}`.replace("//", "/");

// Utility to construct a local asset URL
// eslint-disable-next-line react-refresh/only-export-components
export const createLocalUrl = ({
  name,
  type = "png",
}: {
  name?: string;
  type?: string;
}): string => {
  if (!name) return "";

  const LocalUrl = `${window.location.protocol}//${window.location.host}`;
  return `${LocalUrl}/assets/${type}/${name}.${type}`;
};

// Props for the LocalImage component
interface LocalImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
  type?: string;
  defaultSrc?: string;
}

// LocalImage Component
const LocalImage: React.FC<LocalImageProps> = ({
  name,
  type = "png",
  defaultSrc = "",
  ...props
}) => {
  return (
    <div>
      <Image
        src={createLocalUrl({ name, type })}
        defaultSrc={createLocalUrl({ name: defaultSrc, type })}
        {...props}
      />
    </div>
  );
};

export default LocalImage;

// import LocalImage from "./components/LocalImage"; // adjust the path as needed

// const ExampleComponent = () => {
//   return (
//     <div className="p-4">
//       <h2>Company Logo</h2>
//       <LocalImage name="company-logo" alt="Company Logo" className="w-32 h-auto" />
//     </div>
//   );
// };

// export default ExampleComponent;
