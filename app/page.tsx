import { Button } from "@/components/ui/button";
import UserTable from "@/components/users-table";
import { UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserForm from "@/components/user-form";

export default async function Home() {

    return (
        <div className="space-y-8 flex min-h-screen flex-col items-center p-24">
            <div className="w-full flex flex-row items-center justify-between gap-4">
                <h1>Users</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="hover:cursor-pointer">Create User <UserPlus className="size-4" /></Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a new user.
                            </DialogDescription>
                        </DialogHeader>
                        <UserForm />
                    </DialogContent>
                </Dialog>
            </div>
            <UserTable />
        </div>
    );
}
