"use client";
import { InboxLayout, FeedLayout } from "ui";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}