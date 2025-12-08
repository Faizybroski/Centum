import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { UserDTO } from '@/dto'
import Link from 'next/link'
import { paths } from '@/navigate/paths'
import { StatusBadge } from '@/components/statusBadge/StatusBadge.component'

export default function useUsersColumns() {
  const [columns, setColumns] = React.useState<ColumnDef<UserDTO>[]>([
    {
      accessorKey: 'full_name',
      header: 'Full Name',
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
      cell: ({ getValue }) => <div className="font-medium">{getValue() as string}</div>,
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone Number',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'is_active',
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge value={getValue() ? 'Active' : 'Inactive'} />,
    },
  ])

  return { columns }
}
