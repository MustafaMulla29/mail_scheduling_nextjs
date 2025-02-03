"use client";

import { useState } from "react";
import AlertComponent from "./Alert";
import MailingsTable from "./MailingsTable";
import dynamic from "next/dynamic";

const AddMailingDialog = dynamic(() => import("./AddMailing"));

const Homepage = () => {
  const [alert, setAlert] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);

  const handleSetAlert = (alertData) => setAlert(alertData);
  const handleOpenDialog = (state) => setIsOpen(state);
  const handleSetEditId = (id) => setEditId(id);
  const handleSetIsEdit = (state) => setIsEdit(state);
  const handleSetOnSuccess = (state) => setOnSuccess(state);

  return (
    <>
      <div className="w-full flex items-center justify-center mt-2 transition-all duration-300">
        <AlertComponent
          heading={alert?.heading}
          desc={alert?.desc}
          variant={alert?.variant}
        />
      </div>

      <AddMailingDialog
        alert={alert}
        setAlert={handleSetAlert}
        open={open}
        setIsOpen={handleOpenDialog}
        editId={editId}
        isEdit={isEdit}
        setIsEdit={handleSetIsEdit}
        setOnSuccess={handleSetOnSuccess}
      />

      <MailingsTable
        setAlert={handleSetAlert}
        setIsOpen={handleOpenDialog}
        setEditId={handleSetEditId}
        setIsEdit={handleSetIsEdit}
        onSuccess={onSuccess}
        setOnSuccess={handleSetOnSuccess}
      />
    </>
  );
};

export default Homepage;
