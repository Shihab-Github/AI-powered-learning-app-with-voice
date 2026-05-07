'use client'

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {SignInButton, UserButton, useUser} from "@clerk/nextjs";

const navItems = [
    {label: "Library", href: "/"},
    {label: "Add New", href: "/books/new"},
]

export const Navbar = () => {
    const pathName = usePathname()
    const { user } = useUser()

    console.log('user: ', user)

    return (
        <header className="w-full fixed z-50 bg-('--bg-primary')">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="Bookified" width={42} height={42}/>
                    <span className="logo-text">AI Powered learning platform</span>
                </Link>
                <nav className="w-fit flex items-center gap-7.5">
                    {navItems.map(({href, label}) => {
                        const isActive = href === "/" || (href !== '/' && pathName.startsWith(href));
                        return (
                            <Link href={href} key={label}
                                  className={cn('nav-link-base', isActive ? 'nav-link-active' : "text-black hover:opacity-70")}>
                                {label}
                            </Link>
                        )
                    })}
                    <div className="flex items-center gap-4 ml-4">

                        {!user && (
                            <SignInButton mode="modal">
                                <button className="px-4 py-2 text-sm font-medium text-black hover:opacity-70">
                                    Sign In
                                </button>
                            </SignInButton>
                        )}

                        {user && (
                            <div className="nav-user-link">
                                <UserButton/>
                                { user.firstName ? (
                                    <Link href={`/subscriptions`}>{user.firstName}</Link>
                                ) : <></>}

                            </div>

                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}