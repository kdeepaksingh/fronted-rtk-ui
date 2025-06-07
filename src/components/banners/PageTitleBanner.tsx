import Translate from "../typography/Translate";

export const PageTitleBanner = ({
  image = "",
  title = "",
  description = "",
}) => (
  <div
    className="flex mt-20  bg-cover  bg-center flex-col justify-center items-left"
    style={{ backgroundImage: `url(${image})` }}
  >
    <div className="w-3/4 ml-8 text-5xl text-white pt-8 ">
      <Translate dataKey={title} />
    </div>
    <div className="ml-8 text-white text-base opacity-100  pb-8 pt-2">
      <Translate dataKey={description} />
    </div>
  </div>
);
