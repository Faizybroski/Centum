import React from 'react'
import { DataTable } from '@/components/dataTable/DataTable.component'
import { useReportsColumns } from './useReportsTable.hook'

export default function ReportsTable({ data, page, setPage, totalPages }: { data: any; page: number; setPage: (page: number) => void; totalPages: number }) {
  const { columns } = useReportsColumns()

  console.log(columns)
  return <DataTable columns={columns} data={data || []} page={page} setPage={setPage} totalPages={totalPages} isPaginationEnabled />
}
