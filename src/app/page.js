import { Container } from "@mui/material";
import Login from "dd(@/components/Login)";
import dynamic from "next/dynamic";

function Page() {
  return (
    <main className="flex justify-center items-center h-svh">
      <Login />
    </main>
  );
}

export default Page;
