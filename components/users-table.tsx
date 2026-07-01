

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2Icon, PencilIcon } from "lucide-react"
import { getUsers } from "@/server/users";
import DeleteUserButton from "./delete-user";
import UserForm from "./user-form";

async function UserTable() {

    const users = await getUsers();

    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            <div className="[&>div]:rounded-lg [&>div]:border [&>div]:border-border/50 [&_tr]:border-border/40">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Email</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead className="w-0 pr-4 text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>
                                    <div className="flex h-full items-center justify-end gap-1">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full"
                                                    aria-label={`edit-user-${user.id}`}
                                                >
                                                    <PencilIcon />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit User</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    Update the user's information.
                                                </DialogDescription>

                                                <UserForm user={user} />
                                            </DialogContent>
                                        </Dialog>

                                        <DeleteUserButton userId={user.id} />
                                        
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default UserTable