import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.user.findMany(); // Adjust model and query as needed
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Error fetching posts" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

type Layouts = "inbox" | "feed";
const ACTIVE_LAYOUT: Layouts = "inbox";

function useActiveLayout(): Layouts {
  const activeLayout = ACTIVE_LAYOUT;
  return activeLayout;
}

export default async function HomePage() {
  const layout = useActiveLayout();

  // async function createUser() {
  //   const newUser = await prisma.user.create({
  //     data: {
  //       name: "Alice",
  //       email: "alice@prisma.io",
  //     },
  //   });
  //   console.log(newUser);
  // }

  // run inside `async` function
  // const res = await fetch("api/users");
  // const data = await res.json();

  const users = await prisma.user.findMany();

  // redirect("/feed");

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          {/* <span>{user..toDateString()}</span> */}
        </div>
      ))}
      <Link href="/auth">Login</Link>
    </div>
  );
}
