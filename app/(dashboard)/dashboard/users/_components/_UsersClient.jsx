"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "../../../_components/Heading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_Columns";

function UsersClient({ data }) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users on your website"
        />
        <Button onClick={() => router.push(`/dashboard/users/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
}

export default UsersClient;
