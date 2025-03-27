'use server'

// use server directive to tell next this is a server component

import { createClient } from "@/utils/supabase/server";

// use our server client from supabase to work with the server 

export const authenticate = async (email: string, password: string) => {

    // async function authenticate accepts a email and password as a string

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        // await our supabase server client and await signing in with valid credentials 

        if(error) throw error

        // if we have error siging in then throw that error to the client for invalid credentials 
        
    } catch (error) {
        console.log("AUTHENTICATION ERROR", error);
        throw error;
        // error for our try catch 
    }
}