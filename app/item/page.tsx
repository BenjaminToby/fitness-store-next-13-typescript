import React from "react";
import { redirect } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*                               Page Component                               */
/* -------------------------------------------------------------------------- */

export default async function SingleItemPage() {
    redirect("/products");
}
