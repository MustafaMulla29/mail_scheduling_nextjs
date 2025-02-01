import { CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const AlertComponent = ({ heading, desc, variant }) => {
  return (
    <div
      className={`transition-all duration-300 ${
        heading ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      }`}
    >
      <Alert variant={variant} className="w-[600px]">
        {variant === "success" && <CheckCircle className="h-4 w-4" />}
        {variant === "destructive" && <XCircle className="h-4 w-4" />}
        <AlertTitle>{heading}</AlertTitle>
        <AlertDescription>{desc}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertComponent;
