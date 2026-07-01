'use client'
import { Button } from './ui/button'
import { Loader2Icon, Trash2Icon } from 'lucide-react'
import { deleteUser } from "@/server/users";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

interface DeleteUserButtonProps {
    userId: string;
}

function DeleteUserButton({ userId }: DeleteUserButtonProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        
        try {
            setIsLoading(true);
            await deleteUser(userId);
            toast.success("User deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete user.");
        } finally {
            setIsLoading(false);
            router.refresh(); // Refresh the page to reflect the changes
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-destructive hover:text-destructive" >
                        
                    <Trash2Icon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this user?
                </DialogDescription>

                <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Delete"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteUserButton