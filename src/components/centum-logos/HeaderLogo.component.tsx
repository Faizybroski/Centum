import React from 'react'
import Image from 'next/image'

export default function HeaderLogo() {
  return <Image src="/assets/icons/centum_ health-logo.svg" alt="Centum Health" className="h-full w-auto object-contain" height={750} width={750} priority />
}
