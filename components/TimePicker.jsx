"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TimePicker = ({ time, setTime }) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const [hour, minute] = time ? time.split(":") : ["00", "00"];

  return (
    <div className="space-y-2">
      <Label htmlFor="time-picker">Time</Label>
      <div className="flex space-x-2">
        <Select
          value={hour}
          onValueChange={(value) => setTime(`${value}:${minute}`)}
        >
          <SelectTrigger id="hour">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((h) => (
              <SelectItem key={h} value={h}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={minute}
          onValueChange={(value) => setTime(`${hour}:${value}`)}
        >
          <SelectTrigger id="minute">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimePicker;
