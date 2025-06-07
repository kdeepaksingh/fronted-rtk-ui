import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker";

interface DateRangePickerProps {
  error?: boolean;
  value?: DateValueType;
  onChange?: (value: DateValueType, e?: HTMLInputElement | null) => void;
  [key: string]: unknown;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  return (
    <Datepicker
      {...props}
      value={props.value ?? { startDate: null, endDate: null }}
      onChange={
        props.onChange ??
        ((value, e) => {
          console.log("Date changed:", value, e);
        })
      }
      readOnly={true}
      containerClassName={`relative w-full text-gray-700 border border-solid rounded-md h-[37px] mb-[8px] ${
        props.error ? "border-ui-danger" : "border-blue-07"
      }`}
      inputClassName={
        "relative transition-all duration-300 py-[7px] pl-4 pr-14 w-full border-gray-300 rounded-md tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
      }
    />
  );
};

export default DateRangePicker;

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { DateValueType } from "react-tailwindcss-datepicker";
// import DateRangePicker from "../components/DateRangePicker";

// interface FormValues {
//   dateRange: DateValueType;
// }

// const ExampleForm: React.FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       dateRange: {
//         startDate: null,
//         endDate: null,
//       },
//     },
//   });

//   const onSubmit = (data: FormValues) => {
//     console.log("Form submitted:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="p-4">
//       <Controller
//         name="dateRange"
//         control={control}
//         rules={{ required: true }}
//         render={({ field, fieldState }) => (
//           <DateRangePicker
//             value={field.value}
//             onChange={field.onChange}
//             error={!!fieldState.error}
//           />
//         )}
//       />

//       {errors.dateRange && (
//         <p className="text-red-500 text-xs">Date range is required.</p>
//       )}

//       <button
//         type="submit"
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ExampleForm;
