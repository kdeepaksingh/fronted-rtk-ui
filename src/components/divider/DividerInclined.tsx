import Translate from "../typography/Translate";

export const DividerInclined = ({ label = "Typo.OR" }) => {
  return (
    <div className="mx-2 flex flex-col justify-center items-center relative w-24 -ml-6 -mr-6">
      <div className="rounded-full border border-ui-primary h-6 w-6 text-center bg-white z-10 absolute flex items-center justify-center">
        <Translate dataKey={label} className="text-ui-primary" />
      </div>
    </div>
  );
};

export default DividerInclined;

{
  /* <DividerInclined label="Typo.OR" /> */
}
