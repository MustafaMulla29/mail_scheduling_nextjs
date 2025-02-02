'use client';

import AlertComponent from '@/components/Alert';
import MailingsTable from '@/components/MailingsTable';
import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function Home() {
  const [alert, setAlert] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const AddMailingDialog = dynamic(() => import('@/components/AddMailing'));

  return (
    <div className="">
      <div className="w-full flex items-center justify-center mt-2 transition-all duration-300">
        <AlertComponent
          heading={alert?.heading}
          desc={alert?.desc}
          variant={alert?.variant}
        />
      </div>
      <AddMailingDialog alert={alert} setAlert={setAlert} open={open} setIsOpen={setIsOpen} editId={editId} isEdit={isEdit} setIsEdit={setIsEdit} />
      <MailingsTable setAlert={setAlert} open={open} setIsOpen={setIsOpen} setEditId={setEditId} setIsEdit={setIsEdit} />
    </div>
  );
}