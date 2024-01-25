"use client";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GithubIcon, GoogleIcon } from "../../../components/icon";
import { Button } from "./../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./../../../components/ui/form";
import { Input } from "./../../../components/ui/input";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <Button className="w-full gap-x-2 text-white" style={{ background: "#4285F4" }}>
            <GoogleIcon className="h-5 w-5  fill-white" />
            Sign in with Google
          </Button>
          <Button className="w-full gap-x-2  text-white" style={{ background: "#181717" }}>
            <GithubIcon className="h-5 w-5 fill-white" />
            Sign in with GitHub
          </Button>
        </div>
        <div className="relative mb-4">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
                    <FormDescription>
                      <Link className="text-sm underline text-gray-600 dark:text-gray-400" href="#">
                        Forgot your password?
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 ">
          Don&apos;t have an account?&nbsp;
          <Link className="underline text-blue-600 dark:text-blue-400" href="/signup">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
