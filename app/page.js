'use client';

import AddMailing from '@/components/AddMailing';
import AlertComponent from '@/components/Alert';
import MailingsTable from '@/components/MailingsTable';
import { useState } from 'react';

export default function Home() {
  const [alert, setAlert] = useState(null);

  return (
    <div className="">
      <div className="w-full flex items-center justify-center mt-2 transition-all duration-300">
        <AlertComponent
          heading={alert?.heading}
          desc={alert?.desc}
          variant={alert?.variant}
        />
      </div>
      <AddMailing alert={alert} setAlert={setAlert} />
      <MailingsTable setAlert={setAlert} />
    </div>
  );
}