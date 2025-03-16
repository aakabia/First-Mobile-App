import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthProvider({ children }: PropsWithChildren) {
    // Above, we export a AuthProvider that takes in children of type PropsWithChildren
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState(null);
  const [mounting, setMounting] = useState(true);

  // create our states for our auth data - session, user and mounting 

  type AuthData = {
    session: Session | null;
    mounting: boolean;
    user: any;
  };

  // create a type for our auth data

  const AuthContext = createContext<AuthData>({
    session: null,
    mounting: true,
    user: null,
  });

  // create a context for our authdata and use the types set in AuthData

  useEffect(() => {
    // useEffect for data fetching

    const fetchSession = async () => {
        // set a custom function for data fetching from supabase 

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // get our session through nested destructures

      setSession(session);

      // set our session to our current session

      if (session) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("error", error);
        }else{
            setUser(user);
        }
      }

      // if session exists get user data for that session 
      // Also set the user to that user object 

      setMounting(false);
      // set mounting to false at the end of useEffect
    };

    fetchSession();
    // call our function 

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // use onAuthStateChange to manage state changes to our session 
  }, []);

  return (
    <AuthContext.Provider value={{ session, mounting, user }}>
      {children}
    </AuthContext.Provider>
    
  );

  // return our AuthContext.Provider to set the context and any reusable props from this component.
  // props available to other components are session, mounting and user 
}
