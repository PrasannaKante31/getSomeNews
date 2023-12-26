// import * as React from "react";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// export default function DatePickerValue({ changeDate, label }) {
//   const [value, setValue] = React.useState(dayjs("2022-04-17"));
//   console.log(dayjs("2022-04-17").$y);

//   function changeValue(evt) {
//     console.log("val is ", evt.target.value);
//     setValue((oldVal) => evt.target.value);
//   }

//   return (
//     <>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={["DatePicker", "DatePicker"]}>
//           <DatePicker
//             label={label}
//             value={value}
//             onChange={(evt) => {
//               console.log(evt.target.value);
//               changeValue();
//             }}
//           />
//         </DemoContainer>
//       </LocalizationProvider>
//     </>
//   );
// }

import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function giveDate() {
  let now = new Date();
  return "".concat(
    now.getFullYear(),
    "-",
    now.getMonth() + 1,
    "-",
    now.getDate()
  );
}
export default function DatePickerValue({ changeDate, label }) {
  const [value, setValue] = React.useState(() => dayjs(giveDate()));

  function changeValue(newDate) {
    let nd = "".concat(
      String(newDate.$y),
      "-",
      String(newDate.$M + 1).length === 1
        ? String(0) + String(newDate.$M + 1)
        : String(newDate.$M + 1),
      "-",
      String(newDate.$D).length === 1
        ? String(0) + String(newDate.$D)
        : String(newDate.$D)
    );
    changeDate(nd);
    setValue(newDate);
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            label={label}
            value={value}
            onChange={(newDate) => {
              console.log("onChange event:", newDate);
              changeValue(newDate);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
