import { useEffect, useState } from "react";

const useErrorMessage = (duration) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer;
    if (errorMessage) timer = setTimeout(() => setErrorMessage(""), duration);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return [errorMessage, setErrorMessage];
};

export default useErrorMessage;
