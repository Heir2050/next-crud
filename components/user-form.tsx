"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createUser } from "@/server/users";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    username: z
        .string()
        .min(4, "Username must be at least 4 characters.")
        .max(32, "Username must be at most 32 characters."),
});

// import React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserForm() {

    const router = useRouter();

    const [isLoading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {

        setLoading(true);

        try {

            await createUser(data);

            toast.success("User created successfully!");

            form.reset();

            router.refresh();

        } catch (error) {
            toast.error("Failed to create user.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-email">
                                Email
                            </FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                id="form-rhf-demo-email"
                                aria-invalid={fieldState.invalid}
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-username">
                                Username
                            </FieldLabel>
                            <Input
                                {...field}
                                id="form-rhf-demo-username"
                                aria-invalid={fieldState.invalid}
                                placeholder="john doe"
                                autoComplete="username"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="mt-6 flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Create"}
                </Button>
            </div>
        </form>
    );
}
