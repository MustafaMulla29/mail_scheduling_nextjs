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
import { useEffect, useState } from "react";
import Spinner from "./spinner";

const MailingsTable = ({ setAlert }) => {
  const [mailings, setMailings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMailings = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("api/mailings");
      if (res.status === 200) {
        setMailings(res.data.mailings);
      }
    } catch (error) {
      console.log(error);
      setAlert({
        heading: "error",
        desc: "Failed to fetch mailings",
        variant: "error",
      });
      setTimeout(() => setAlert(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMailings();
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Scheduled Mailings</h2>
            <Button>
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
              {mailings?.map((mailing, index) => (
                <TableRow key={index}>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default MailingsTable;
