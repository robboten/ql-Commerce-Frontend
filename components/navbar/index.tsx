import { getMenu } from "@/lib/api";
import { Suspense } from "react";
import { MobileNav } from "../ui/mobile-nav";
import Link from "next/link";
import { Menu } from "@/lib/api/types";
import { Icons } from "../ui/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="relative flex items-center justify-between w-full">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileNav />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-10"
          >
            <Icons.logo className="h-8 w-8" />
            <div className="ml-2 flex-none text-lg font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-lg font-medium text-neutral-600 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div> */}
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 sm:justify-end">
        <Link
          href={"https://github.com/robboten/"}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-9 px-0"
            )}
          >
            <Icons.gitHub className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <Link
          href={"https://www.linkedin.com/in/robert-hedblad/"}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-9 px-0"
            )}
          >
            <Icons.linkedIn className="h-4 w-4 fill-current" />
            <span className="sr-only">LinkedIn</span>
          </div>
        </Link>
        {/* <ModeToggle /> */}
      </div>
    </nav>
  );
}
