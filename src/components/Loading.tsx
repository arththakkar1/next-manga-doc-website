import React from "react";
import { Loader2 } from "lucide-react";

type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex  items-center gap-x-2 justify-center ${
        fullScreen ? "h-screen" : "h-auto"
      } w-full text-zinc-300`}
    >
      <p className="font-semibold text-sm sm:text-lg">{message}</p>
      <Loader2 className="animate-spin w-6 h-6 text-lg  text-white" />
    </div>
  );
};

export default Loading;
