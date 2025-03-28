import { ADMIN } from "@/constants/constants";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {ReactNode } from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
    if (data.type === ADMIN) return redirect("/admin");

    // data.type admin is coming from our supabase user table we created
  }

  return <>{children}</>;
}

// Above, checks if user is authenticated
// Then, if user is of type admin is already authenticated return us to the admin page and dont allow them to visit auth page again.
// If not of type admin just return the page / children. 
// This will run whenever we visit our auth page.
// AuthLayout is a function that destructures children and uses a the generic type Readonly.
// Inside Readonly we are saying children should be of type Reactnode
