'use client'

import { Button } from '@/components/ui/button'
import { paths } from '@/navigate/paths'
import { CircleUserRound, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NavbarOptions } from './PublicHeader.config'
import { useReduxSelector } from '@/hooks'
import HeaderLogo from '@/components/centum-logos/HeaderLogo.component'
import { usePathname } from 'next/navigation'

function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn, role } = useReduxSelector((state) => state.user)
  const pathName = usePathname()

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`
        absolute sticky top-0 z-50 px-4  
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
      `}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-24">

          <Link href="/" className="flex items-center h-20 p-1" onClick={() => setMobileMenuOpen(false)}>
            <HeaderLogo />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NavbarOptions.map((option) => (
              <Link key={option.name} href={option.href} className={`block text-black hover:text-primary font-semibold text-md py-1 ${option.href === pathName ? 'border-b-2 border-primary' : ''}`}>
                {option.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="md:hidden text-black hover:bg-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <Link href={role === 'customer' ? paths.customerDashboard() : paths.adminDashboard()}>
                  <Button size="sm" className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] w-38">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href={paths.login()}>
                    <Button size="sm" className="text-black bg-transparent hover:bg-transparent hover:text-[#16AF9D]">
                      <CircleUserRound className='mr-2 hover:text-black' /> Sign In
                    </Button>
                  </Link>
                  <Link href={paths.signup()}>
                    <Button className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] w-38">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 ">
          <div className="px-4 py-4 space-y-3">
            {NavbarOptions.map((option) => (
              <Link key={option.name} href={option.href} onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-green-400 font-medium py-2">
                {option.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <Link href={paths.customerDashboard()}>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="pt-3 border-t border-gray-800 space-y-2">
                <Link href={paths.login()} className="block">
                  <Button size="sm" className="w-full bg-black hover:bg-gray-800 text-white">
                    Log In
                  </Button>
                </Link>
                <Link href={paths.signup()} className="block">
                  <Button className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] hover:bg-green-700 w-full" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default PublicHeader


// 'use client'

// import { Button } from '@/components/ui/button'
// import { paths } from '@/navigate/paths'
// import { CircleUserRound, Menu, X } from 'lucide-react'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { NavbarOptions } from './PublicHeader.config'
// import { useReduxSelector } from '@/hooks'
// import HeaderLogo from '@/components/centum-logos/HeaderLogo.component'
// import { usePathname } from 'next/navigation'

// function PublicHeader() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const { isLoggedIn, role } = useReduxSelector((state) => state.user)
//   const pathName = usePathname()

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);

//   useEffect(() => {
//     let lastY = window.scrollY;

//     const handleScroll = () => {
//       const currentY = window.scrollY;

//       // background toggle
//       setIsScrolled(currentY > 10);

//       // hide on scroll down, show on scroll up
//       if (currentY > lastY) {
//         setShowHeader(false); 
//       } else {
//         setShowHeader(true);
//       }

//       lastY = currentY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={`
//         fixed top-0 left-0 w-full z-50 transition-all duration-300 border border-b
//         ${showHeader ? "translate-y-0" : "-translate-y-full"}
//         ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
//       `}
//     >
//       <div className='bg-[#16AF9D] text-white py-2 hidden lg:block'>
//         <div className='max-w-2xl flex mx-auto'>
//           <p>Centum is now officially CE-marked as a medical device under MDR.</p>
//           <Link href="/" className='hover:underline ms-2 font-semibold'>
//             Read more →
//           </Link>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-24">

//           <Link href="/" className="flex items-center h-20 p-1" onClick={() => setMobileMenuOpen(false)}>
//             <HeaderLogo />
//           </Link>

//           <nav className="hidden md:flex items-center space-x-8">
//             {NavbarOptions.map((option) => (
//               <Link key={option.name} href={option.href} className={`block text-black hover:text-[#16AF9D] font-semibold text-md py-1 ${option.href === pathName ? 'text-[#16AF9D] border-b-2 border-[#16AF9D]' : ''}`}>
//                 {option.name}
//               </Link>
//             ))}
//           </nav>
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="sm" className="md:hidden text-black hover:bg-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>

//             <div className="hidden md:flex items-center gap-3">
//               {isLoggedIn ? (
//                 <Link href={role === 'customer' ? paths.customerDashboard() : paths.adminDashboard()}>
//                   <Button size="sm" className="bg-green-600 hover:bg-green-700">
//                     Dashboard
//                   </Button>
//                 </Link>
//               ) : (
//                 <>
//                   <Link href={paths.login()}>
//                     <Button size="sm" className="text-black bg-transparent hover:bg-transparent hover:text-[#16AF9D]">
//                       <CircleUserRound className='mr-2 hover:text-black' /> Sign Up
//                     </Button>
//                   </Link>
//                   <Link href={paths.signup()}>
//                     <Button className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] w-38">
//                       Get Started
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="md:hidden bg-black border-t border-gray-800  px-4">
//           <div className="px-4 py-4 space-y-3">
//             {NavbarOptions.map((option) => (
//               <Link key={option.name} href={option.href} onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-green-400 font-medium py-2">
//                 {option.name}
//               </Link>
//             ))}

//             {isLoggedIn ? (
//               <Link href={paths.customerDashboard()}>
//                 <Button size="sm" className="bg-green-600 hover:bg-green-700">
//                   Dashboard
//                 </Button>
//               </Link>
//             ) : (
//               <div className="pt-3 border-t border-gray-800 space-y-2">
//                 <Link href={paths.login()} className="block">
//                   <Button size="sm" className="w-full bg-black hover:bg-gray-800 text-white">
//                     Log In
//                   </Button>
//                 </Link>
//                 <Link href={paths.signup()} className="block">
//                   <Button className="bg-[linear-gradient(to_right,#16AF9D_0%,#0B3029_100%)] hover:bg-green-700 w-full" size="sm">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }

// export default PublicHeader
