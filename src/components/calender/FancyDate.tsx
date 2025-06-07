export const FancyDate = ({ date = new Date() }) => {
  return (
    <div className="w-10 border-2 border-ui-danger rounded">
      <div className="bg-ui-danger text-ui-light text-center text-xxxs uppercase leading-3 font-semibold">
        {date.toLocaleString("en-US", { month: "short" }) || "--"}
      </div>
      <div className="font-semibold text-lg leading-none text-center p-0.5">
        <div className="mb-0.5 text-base leading-3">
          {date.getDate() || "--"}
        </div>
        <div className="text-ui-danger text-xxxs">
          {date.getFullYear() || "--"}
        </div>
      </div>
    </div>
  );
};

export default FancyDate;

// import React from "react";
// import FancyDate from "../components/FancyDate";
// const SomeComponent: React.FC = () => {
//   const today = new Date();

//   return (
//     <div className="p-4">
//       <h1 className="mb-2">Today's Fancy Date:</h1>
//       <FancyDate date={today} />
//     </div>
//   );
// };

// export default SomeComponent;
