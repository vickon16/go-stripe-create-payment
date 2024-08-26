import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";

export default function Loader() {
  return (
    <div className="w-full flex justify-center items-center">
      <CircularProgress />
    </div>
  );
}
