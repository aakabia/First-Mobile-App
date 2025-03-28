import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RenderMounted } from "@/components/render-mounted";
import { ADMIN } from "@/constants/constants";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();
    if (error || !data) {
      console.log("Error fetching user data", error);
      return;
    }
    if (data.type === ADMIN) return redirect("/");

    // data.type admin is coming from our supabase user table we created
  }

  return (
    <RenderMounted>
      <Header />
      <main className="min-h-[calc(100svh-128px)] py-3">{children}</main>
      <Footer />
    </RenderMounted>
  );
}

// Above, checks if user is authenticated
// Then, if user is of type admin is already authenticated return us to the home page and dont allow them to visit admin page again.
// If not of type admin just return the page / children.
// min-h-[calc(100svh-128px)] 100% small viewport height - 128px  because header and footer have height of 64px,
