import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { paths } from '@/navigate/paths'

export default function AuthLogo() {
  return (
    <Link href={paths.home()}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center mb-2">
          <Image src="/assets/icons/centum_health-logo.svg" alt="Centum Health" className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-18 object-contain" height={750} width={750} priority />
        </div>
      </div>
    </Link>
  )
}
