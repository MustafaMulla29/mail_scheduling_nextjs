"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MailerSelector = ({ mailers, setSelectedMailer }) => {
  return (
    <div>
      <Select onValueChange={(value) => setSelectedMailer(value)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select mailer" />
        </SelectTrigger>
        {mailers.length > 0 && (
          <SelectContent>
            <SelectGroup>
              {mailers.map((mailer) => (
                <SelectItem key={mailer.id} value={mailer.name}>
                  {mailer.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        )}
      </Select>
    </div>
  );
};

export default MailerSelector;
