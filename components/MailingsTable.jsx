import { format } from "date-fns";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";

const MailingRow = ({ mailing, handleEdit, handleDelete }) => {
  return (
    <TableRow>
      <TableCell>{mailing.mailer}</TableCell>
      <TableCell>{mailing.list}</TableCell>
      <TableCell>{format(new Date(mailing.date), "PP")}</TableCell>
      <TableCell>{mailing.time}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(mailing.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(mailing.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const MailingsTable = ({
  setIsEdit,
  setAlert,
  setIsOpen,
  setEditId,
  onSuccess,
  setOnSuccess,
}) => {
  const [mailings, setMailings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMailings = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get("/api/mailings");
      if (status === 200) setMailings(data);
    } catch (error) {
      console.error(error);
      setAlert({
        heading: "Error",
        desc: "Failed to fetch mailings",
        variant: "destructive",
      });
      setTimeout(() => setAlert(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [setAlert]);

  useEffect(() => {
    fetchMailings();
  }, [fetchMailings]);

  useEffect(() => {
    if (onSuccess) {
      fetchMailings();
      setOnSuccess(false);
    }
  }, [onSuccess, fetchMailings, setOnSuccess]);

  const handleEdit = (id) => {
    setEditId(id);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`api/mailings/`, { params: { id } });
      if (res.status === 200) {
        setAlert({
          heading: "success",
          desc: "Mailing deleted successfully",
          variant: "success",
        });
        setTimeout(() => setAlert(null), 3000);
        fetchMailings();
      }
    } catch (error) {
      console.log(error);
      setAlert({
        heading: "error",
        desc: "Failed to delete mailing",
        variant: "error",
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Scheduled Mailings</h2>
          <p className="text-gray-600 text-[14px]">
            See your all scheduled mailings
          </p>
        </div>
        <Button
          onClick={() => {
            setIsEdit(false);
            setIsOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mailer</TableHead>
            <TableHead>List</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan="5" className="text-center">
                <div className="flex justify-center items-center py-10">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : mailings.length === 0 && !isLoading ? (
            <TableRow>
              <TableCell
                colSpan="5"
                className="text-center text-gray-500 py-10"
              >
                No scheduled mailings found. <br />
                <Button className="mt-2" onClick={() => setIsOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Mailing
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            mailings.map((mailing, index) => (
              <MailingRow
                key={index}
                mailing={mailing}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MailingsTable;
