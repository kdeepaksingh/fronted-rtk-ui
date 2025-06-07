import ReactScroll from "react-scrollbar";

export const SmoothScrolling: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className = "" }) => (
  <ReactScroll speed={0.4} smoothScrolling className={className}>
    {children}
  </ReactScroll>
);

// import { SmoothScrolling } from "./components/SmoothScrolling"; // adjust path
// import "./styles.css"; // if needed, to ensure styles are loaded

// const SampleComponent = () => {
//   return (
//     <div className="h-[300px] w-full border border-gray-300">
//       <SmoothScrolling className="h-full">
//         <div className="p-4 space-y-4">
//           {Array.from({ length: 20 }).map((_, i) => (
//             <div key={i} className="p-2 bg-gray-100 rounded">
//               Item {i + 1}
//             </div>
//           ))}
//         </div>
//       </SmoothScrolling>
{
  /* <ReactScroll
  speed={0.4}
  smoothScrolling
  horizontal={false}
  className={className}
>
  {children}
</ReactScroll> */
}

//     </div>
//   );
// };

// export default SampleComponent;
