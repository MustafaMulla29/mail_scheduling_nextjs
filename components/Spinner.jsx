import { LoaderIcon } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoaderIcon className="animate-spin h-12 w-12 text-primary" />
    </div>
  );
};

export default Spinner;
