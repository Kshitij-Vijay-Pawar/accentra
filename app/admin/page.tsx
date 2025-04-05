import { redirect } from "next/navigation";
import { getIsAdmin } from "@/lib/admin";
import App from "./app";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin(); // Await the result of getIsAdmin

  if (!isAdmin) {
    redirect("/"); // Redirect if the user is not an admin
  }

  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
