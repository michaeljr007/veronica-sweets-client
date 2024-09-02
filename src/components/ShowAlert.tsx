import React from "react";

function ShowAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="absolute z-20 top-0 mx-auto w-[90%] bg-red-500 text-white p-3 rounded text-center">
      {message}
    </div>
  );
}

export default ShowAlert;
