"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ListSelector = ({ lists, setSelectedList }) => {
  return (
    <div>
      <Select onValueChange={(value) => setSelectedList(value)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select List" />
        </SelectTrigger>
        {lists.length > 0 && (
          <SelectContent>
            <SelectGroup>
              {lists?.map((list) => (
                <SelectItem key={list.id} value={list.name}>
                  {list.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        )}
      </Select>
    </div>
  );
};

export default ListSelector;
