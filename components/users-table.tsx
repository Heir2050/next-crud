import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUsers } from "@/server/users";

async function UserTable() {
    
    const users = await getUsers();
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                {/* <TableHead className="w-25">ID</TableHead> */}
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        {/* <TableCell className="font-medium">{user.id}</TableCell> */}
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell className="text-right">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserTable