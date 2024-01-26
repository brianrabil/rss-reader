"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { createUser } from "./../../actions";

const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(50, { message: "Password must be between 8 and 50 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(50, { message: "Password must be between 8 and 50 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("form data: ", data);
    startTransition(() => {
      createUser(data);
    });
  };

  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 ">
          Already have an account?&nbsp;
          <Link className="underline text-blue-600 dark:text-blue-400" href="/login">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
