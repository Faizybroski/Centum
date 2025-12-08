'use client'

import { useRouter } from 'next/navigation'
import { useTransition, useState, useCallback } from 'react'

interface NavigateOptions {
  replace?: boolean
  prefetch?: boolean
}

interface ActionNavigateOptions extends NavigateOptions {
  action: () => Promise<unknown>
}

export function useRouterTransition() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isActionLoading, setIsActionLoading] = useState(false)

  const navigate = useCallback(
    (url: string, { replace = false, prefetch = false }: NavigateOptions = {}) => {
      if (prefetch) router.prefetch(url)

      startTransition(() => {
        replace ? router.replace(url) : router.push(url)
      })
    },
    [router],
  )

  const navigateAfterAction = useCallback(
    async (url: string, { action, replace = false, prefetch = false }: ActionNavigateOptions) => {
      try {
        setIsActionLoading(true)
        await action()
        if (prefetch) router.prefetch(url)

        startTransition(() => {
          replace ? router.replace(url) : router.push(url)
        })
      } finally {
        setIsActionLoading(false)
      }
    },
    [router],
  )

  const prefetch = useCallback(
    (url: string) => {
      router.prefetch(url)
    },
    [router],
  )

  return {
    navigate,
    navigateAfterAction,
    prefetch,
    isPending,
    isActionLoading,
    isLoading: isPending || isActionLoading,
  }
}

// examples

// export default function Home() {
//     const { navigate, prefetch, isPending } = useRouterTransition()

//     return (
//       <Button
//         onMouseEnter={() => prefetch("/about")}
//         onClick={() => navigate("/about")}
//         disabled={isPending}
//       >
//         {isPending ? "Loading..." : "Go to About"}
//       </Button>
//     )
//   }

// "use client"
// import { useRouterTransition } from "@/hooks/useRouterTransition"
// import { Button } from "@/components/ui/button"

// async function generateReport() {
//   await new Promise((res) => setTimeout(res, 2000)) // simulate API
// }

// export default function ReportButton() {
//   const { navigateAfterAction, isLoading } = useRouterTransition()

//   return (
//     <Button
//       onClick={() =>
//         navigateAfterAction("/report/123", {
//           action: generateReport,
//           prefetch: true
//         })
//       }
//       disabled={isLoading}
//     >
//       {isLoading ? "Generating..." : "Generate Report"}
//     </Button>
//   )
// }
