"use client";

// page render on the client 


import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// Above are our components to help build our form 



import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


// Above are our shadcn UI components for help with faster UI build.


import { CategoryTableRow } from "@/components/category";

// Above is our custom component to display a category and its products to a page.


import {createCategorySchema, CreateCategorySchema } from "@/app/admin/categories/create-category.schema";

// Above createCategorySchema is a zod helper object that is used to help with valadation when a use is creating a new category 
// CreateCategorySchema is the types associated with our zod object 

import { CategoriesWithProductResponse } from "@/app/admin/categories/categories.type";

// CategoriesWithProductResponse is our type for a category and its products

import { CategoryForm } from "@/app/admin/categories/category-form";



type Props = {
    categories: CategoriesWithProductResponse
}

const CategoriesPageComponent : FC<Props> = ({categories}) =>{

    return <>
        Categories Page Component
    </>
};

export default CategoriesPageComponent