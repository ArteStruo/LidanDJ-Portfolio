import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    redirect("/admin/login");
  }

  const payload = await verifyAdminToken(token, secret);

  if (!payload) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
