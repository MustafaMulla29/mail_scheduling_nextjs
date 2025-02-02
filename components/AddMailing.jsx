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
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader, PlusCircle } from "lucide-react";
import TimePicker from "./TimePicker";
import Spinner from "./Spinner.jsx";

const AddMailing = ({
  isEdit,
  setIsEdit,
  setAlert,
  open,
  setIsOpen,
  editId,
}) => {
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

      if (mailersRes.status === 200 && listsRes.status === 200) {
        setMailers(mailersRes.data.mailers || []);
        setLists(listsRes.data.lists || []);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open) fetchData();
  }, [open]);

  useEffect(() => {
    if (!isEdit) return;
    console.log("Fetch date");
    const fetchMailing = async () => {
      try {
        const res = await axios.get(`/api/mailings`, {
          params: { id: editId },
        });

        if (res.status === 200) {
          const mailing = res.data;
          setSelectedMailer(mailing.mailer);
          setSelectedList(mailing.list);
          setDate(new Date(mailing.date));
          setTime(mailing.time);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMailing();
  }, [isEdit]);

  console.log("Date", date, "isEdit", isEdit, "open", open);

  const submit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);

    try {
      const data = {
        mailer: selectedMailer,
        list: selectedList,
        date: date ? date.toISOString().split("T")[0] : null,
        time,
      };
      let res;

      if (isEdit) {
        res = await axios.patch("/api/mailings/", { data, id: editId });
        if (res.status === 200) {
          setAlert({
            heading: "Success",
            desc: "Mailing updated",
            variant: "success",
          });
          setSelectedList(res.data.list);
          setSelectedMailer(res.data.mailer);
          setDate(new Date(res.data.date));
          setTime(res.data.time);
        }
      } else {
        res = await axios.post("/api/mailings", data);
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
        }
      }

      setTimeout(() => setAlert(null), 2000);
      setIsOpen(false);
      window.location.reload();
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
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setIsOpen(value && isEdit);
        if (!value) setIsEdit(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Schedule</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit" : "Add"} a schedule for your email campaign
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
              selectedMailer={selectedMailer}
              setSelectedMailer={setSelectedMailer}
              isEdit={isEdit}
            />
            <ListSelector
              lists={lists}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              isEdit={isEdit}
            />
            <DatePicker date={date} setDate={setDate} isEdit={isEdit} />
            <TimePicker time={time} setTime={setTime} isEdit={isEdit} />
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
                {editId ? "Submit" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMailing;
