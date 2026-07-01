

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { getUsers } from "@/server/users";
import DeleteUserButton from "./delete-user";

async function UserTable() {

    const users = await getUsers();

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
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full"
                                            aria-label={`edit-user-${user.id}`}
                                        >
                                            <PencilIcon />
                                        </Button>

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