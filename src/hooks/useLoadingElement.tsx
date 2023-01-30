import { useState } from "react";

export default function useLoadingElement() {
  const [loadingStatus, setLoadingStatus] = useState(true);

  return { loadingStatus, setLoadingStatus };
}
