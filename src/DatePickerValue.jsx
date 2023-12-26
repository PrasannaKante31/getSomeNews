import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function giveDate(flag) {
  let now = new Date();
  if (!flag) now.setDate(now.getDate() - 1);
  return "".concat(
    now.getFullYear(),
    "-",
    now.getMonth() + 1,
    "-",
    now.getDate()
  );
}
export default function DatePickerValue({ changeDate, label }) {
  const [value, setValue] = React.useState(() =>
    dayjs(giveDate(label === "from" ? false : true))
  );

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
