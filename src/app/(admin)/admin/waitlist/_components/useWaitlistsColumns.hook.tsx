import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { WaitlistDTO } from '@/dto/Waitlist.dto'

export default function useWaitlistsColumns() {
  const columns = React.useMemo<ColumnDef<WaitlistDTO>[]>(
    () => [
      {
        accessorKey: 'subscription_type',
        header: 'Tier',
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        cell: ({ getValue }) => <div className="font-medium">{getValue() as string}</div>,
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ getValue }) => {
          const value = getValue() as string
          const date = new Date(value)

          return (
            <span className="text-muted-foreground">
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </span>
          )
        },
      },
      // ])
    ],
    [],
  )

  return { columns }
}
