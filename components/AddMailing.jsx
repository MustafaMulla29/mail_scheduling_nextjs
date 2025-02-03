"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  setOnSuccess,
}) => {
  const [mailers, setMailers] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedMailer, setSelectedMailer] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("00:00");

  const isSubmitted = useRef(false);

  useEffect(() => {
    if (!open || mailers.length > 0 || lists.length > 0) return;

    const fetchData = async () => {
      try {
        const [mailersRes, listsRes] = await Promise.all([
          axios.get("/api/mailers"),
          axios.get("/api/lists"),
        ]);

        setMailers(mailersRes.data.mailers || []);
        setLists(listsRes.data.lists || []);
      } catch (error) {
        console.error("Error fetching mailers/lists", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [open, mailers.length, lists.length]);

  useEffect(() => {
    if (!isEdit || !editId) return;

    const fetchMailing = async () => {
      try {
        const { data } = await axios.get(`/api/mailings`, {
          params: { id: editId },
        });

        setSelectedMailer(data.mailer);
        setSelectedList(data.list);
        setDate(new Date(data.date));
        setTime(data.time);
      } catch (error) {
        console.error("Error fetching mailing", error);
      }
    };

    fetchMailing();
  }, [isEdit, editId]);

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmitted.current) return;
      isSubmitted.current = true;

      try {
        const payload = {
          mailer: selectedMailer,
          list: selectedList,
          date: date.toLocaleDateString("sv"),
          time,
        };

        const res = isEdit
          ? await axios.patch("/api/mailings/", { data: payload, id: editId })
          : await axios.post("/api/mailings", payload);

        setAlert({
          heading: "Success",
          desc: isEdit ? "Mailing updated" : "Mailing scheduled successfully",
          variant: "success",
        });

        if (!isEdit) {
          setSelectedMailer(null);
          setSelectedList(null);
          setDate(null);
          setTime("00:00");
        }

        setTimeout(() => setAlert(null), 2000);
        setIsOpen(false);
        setOnSuccess(true);
      } catch (error) {
        console.log(error);
        setAlert({
          heading: "Error!",
          desc: "Failed to add schedule.",
          variant: "destructive",
        });
        setTimeout(() => setAlert(null), 3000);
      } finally {
        isSubmitted.current = false;
      }
    },
    [
      selectedMailer,
      selectedList,
      date,
      time,
      isEdit,
      editId,
      setAlert,
      setIsOpen,
      setOnSuccess,
    ]
  );

  return (
    <Dialog open={open} onOpenChange={(value) => setIsOpen(value && isEdit)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Schedule</DialogTitle>
          <DialogDescription>
            {isEdit ? "Edit" : "Add"} a schedule for your email campaign
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="w-full h-64 flex justify-center items-center">
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
                disabled={!selectedMailer || !selectedList || !date || !time}
                type="submit"
              >
                {isSubmitted.current ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <PlusCircle />
                )}
                {isEdit ? "Submit" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMailing;
