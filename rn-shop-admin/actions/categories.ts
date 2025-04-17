"use server";

import { CategoriesWithProductResponse } from "@/app/admin/categories/categories.type";
import { createClient } from "@/utils/supabase/server";

// import our type and our server component from supabase
// import the server client because this code is running on the server

export const getCategoriesWithProduct =
  async (): Promise<CategoriesWithProductResponse> => {
    // getCategoriesWithProduct is a function that returns a promise with a generic type of CategoriesWithProductResponse

    try {
      // try, catch for better error handeling

      const supabase = await createClient();
      const { data, error } = await supabase
        .from("category")
        .select("* , products:product(*)")
        .returns<CategoriesWithProductResponse>();
      if (error)
        throw new Error(`Error fetching categories:  ${error.message}`);

      return data || [];
    } catch (error) {
      console.error("Error fetching categories with products:", error);
      throw new Error("Failed to fetch categories with products");
      // Log the error for debugging purposes
    }
  };

// Above, we create our supabase client for the server
// then query our category table for everything in it and everything in its list of products from product table
// we Override the type returns but returns may depreciate soon
// we destructure the data and any errors from our query
// if any error then throw a new error
// if no error return our array of data
// **NOTE (when using types) -- do not forget to update utils/supabase/types.ts by generating new types whenever we add new or update tables in supabase.
// use cl command supabase gen types typescript --schema public > some file route -- to generate new types for your schema.
