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

export default function UserForm() {

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

        toast("You submitted the following values:", {
            description: (
                <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        });

        await createUser(data);

        form.reset();

        setLoading(false);
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
