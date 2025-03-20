import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {

    // TODO: check if user is authenticated and if user is an admin

    return <>
   
    { children }
    
    </>
}
