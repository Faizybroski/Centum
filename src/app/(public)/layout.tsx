import AuthGraud from '@/components/authGraud/AuthGraud.component'
import PublicHeader from '../../_layouts/public/header/PublicHeader.component'
import PublicFooter from '../../_layouts/public/footer/PublicFooter.component'
import { generateMeta } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Public',
  })

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGraud pageType="public">
      <PublicHeader />
      <div className="overflow-x-hidden md:overflow-x-visible">{children}</div>
      <PublicFooter />
    </AuthGraud>
  )
}


// import AuthGraud from '@/components/authGraud/AuthGraud.component'
// import PublicHeader from '../../_layouts/public/header/PublicHeader.component'
// import PublicFooter from '../../_layouts/public/footer/PublicFooter.component'
// import { generateMeta } from '@/lib/seo'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'

// export const generateMetadata = async () =>
//   await generateMeta({
//     title: 'Public',
//   })

// export default function PublicLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthGraud pageType="public">
//       {/* <div className='bg-[#16AF9D] text-white mx-auto py-2 hidden lg:block'>
//         <div className='max-w-2xl flex mx-auto'>
//           <p>Centum is now officially CE-marked as a medical device under MDR.</p>
//           <Link href="/" className='hover:underline ms-2 font-semibold'>
//             Read more →
//           </Link>
//         </div>
//       </div> */}
//       <PublicHeader />
//       <div className="overflow-x-hidden md:overflow-x-visible pt-[80px]">{children}</div>
//       <PublicFooter />
//     </AuthGraud>
//   )
// }
