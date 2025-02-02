"use client";

import { useEffect, useState } from "react";
import ListSelector from "./ListSelector";
import axios from "axios";
import MailerSelector from "./MailerSelector";
import { DatePicker } from "./DatePicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader, PlusCircle } from "lucide-react";
import TimePicker from "./TimePicker";
import Spinner from "./Spinner.jsx";

const AddMailing = ({ alert, setAlert, open, setIsOpen }) => {
  const [mailers, setMailers] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedMailer, setSelectedMailer] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();
  const [time, setTime] = useState("00:00");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = async () => {
    try {
      const [mailersRes, listsRes] = await Promise.all([
        axios.get("/api/mailers"),
        axios.get("/api/lists"),
      ]);

      if (mailersRes.status === 200) setMailers(mailersRes.data.mailers);
      if (listsRes.status === 200) setLists(listsRes.data.lists);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitted(true);
      const data = {
        mailer: selectedMailer,
        list: selectedList,
        date: date.toISOString().split("T")[0],
        time,
      };
      const res = await axios.post("/api/mailings", data);

      if (res.status === 201) {
        setAlert({
          heading: "Success",
          desc: "Mailing scheduled successfully",
          variant: "success",
        });
        setSelectedList(null);
        setSelectedMailer(null);
        setDate(null);
        setTime("00:00");
        setTimeout(() => setAlert(null), 3000);
        setIsOpen(false);
      }
    } catch (error) {
      setAlert({
        heading: "Error!",
        desc: "Failed to add schedule.",
        variant: "destructive",
      });
      setTimeout(() => setAlert(null), 3000);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Schedule</DialogTitle>
          <DialogDescription>
            Add a schedule for your email campaign
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="w-full h-64">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <MailerSelector
              mailers={mailers}
              setSelectedMailer={setSelectedMailer}
            />
            <ListSelector lists={lists} setSelectedList={setSelectedList} />
            <DatePicker date={date} setDate={setDate} />
            <TimePicker time={time} setTime={setTime} />
            <DialogFooter>
              <Button
                disabled={
                  !selectedMailer ||
                  !selectedList ||
                  !date ||
                  !time ||
                  isSubmitted
                }
                type="submit"
              >
                {isSubmitted ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <PlusCircle />
                )}
                Add
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMailing;
