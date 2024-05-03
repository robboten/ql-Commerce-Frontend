import Image from "next/image";
import TestComponent from "./test";
import { Skeleton } from "@/components/ui/skeleton";
import { TopNav } from "./_components/top-nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 space-y-8">
      {/* brightness-150 saturate-0 <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" /> */}
      <div className="w-[100vw] relative h-[28rem] -mx-[50vw] bg-muted ">
        <Image
          src="https://picsum.photos/seed/x/600"
          alt="alt"
          width={500}
          height={500}
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r  from-black from-60% mix-blend-multiply" />
        <div className="text-white text-2xl absolute w-[500px] h-full inset-28">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, magnam.
          Nesciunt, ad corporis in veniam ea quis saepe repellat aspernatur
          provident a qui hic quibusdam iure dolorem. Sit, rem eum. sdfsdf dsrga
          rgrege erwregerge
        </div>
      </div>
      {/* <div className="flex w-full gap-4">
        <Skeleton className="w-2/3 h-64"/>
        <div className="w-1/3 flex flex-col gap-4">
          <Skeleton className="h-32 w-full"/>
          <Skeleton  className="h-32 w-full"/>
        </div>
      </div> */}
      <div className="grid grid-rows-2 grid-cols-3 grid-flow-col gap-4 w-full">
        <div className="row-span-2 col-span-2 w-full h-full bg-muted rounded-sm overflow-hidden relative">
          <Image
            src="https://picsum.photos/seed/1d2/600"
            alt="alt"
            width={500}
            height={500}
            className="h-full w-full object-cover inset-0 absolute"
          />
        </div>
        <div className="row-span-1  w-full bg-muted  rounded-sm overflow-hidden">
          <Image
            src="https://picsum.photos/seed/2/400"
            alt="alt"
            width={400}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>
        <div className="row-span-1 w-full h-full bg-muted  rounded-sm overflow-hidden">
          <Image
            src="https://picsum.photos/seed/3/400"
            alt="alt"
            width={400}
            height={400}
            className="object-cover w-full h-auto"
          />
        </div>
      </div>
      <div className="w-[100vw] relative h-[10rem] -mx-[50vw] bg-muted">
        <Image
          src="https://picsum.photos/seed/65y/600/200"
          alt="alt"
          width={600}
          height={200}
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r  from-black from-40% mix-blend-multiply opacity-80" />
        <div className="text-white text-xl absolute w-[400px] h-full inset-12 ms-64">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, magnam.
        </div>
      </div>
      {/* <div className="grid grid-cols-4 grid-flow-col gap-4 w-full">
        <div className="flex flex-col gap-4 h-full justify-between items-start">
          <Image
            src="https://picsum.photos/seed/xyz/300"
            alt="alt"
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
          />
          <h2 className="text-xl">test</h2>
          <span className="text-xl font-bold">390 kr</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            quibusdam quas, veritatis consectetur dignissimos non aspernatur
            fugit, illum ad fugiat suscipit officiis nihil beatae pariatur
            autem? Nostrum soluta rerum alias.
          </p>
        </div>
        <div className="flex flex-col gap-4 h-full justify-between items-start">
          <Image
            src="https://picsum.photos/seed/xyz3/300"
            alt="alt"
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
          />
          <h2 className="text-xl">test</h2>
          <span className="text-xl font-bold">390 kr</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            quibusdam quas, veritatis consectetur dignissimos non aspernatur
            fugit, illum ad fugiat suscipit officiis nihil beatae pariatur
            autem? Nostrum soluta rerum alias.
          </p>
        </div>
        <div className="flex flex-col gap-4 h-full justify-between items-start">
          <Image
            src="https://picsum.photos/seed/xyz2/300"
            alt="alt"
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
          />
          <h2 className="text-xl">test</h2>
          <span className="text-xl font-bold">390 kr</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            quibusdam quas, veritatis consectetur dignissimos non aspernatur
            fugit. Nostrum soluta rerum alias.
          </p>
        </div>
        <div className="flex flex-col gap-4 h-full justify-between items-start">
          <Image
            src="https://picsum.photos/seed/xyz1/300"
            alt="alt"
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
          />
          <h2 className="text-xl">test</h2>
          <span className="text-xl font-bold">390 kr</span>
          <p>
            Commodi quibusdam quas, veritatis consectetur dignissimos non
            aspernatur fugit, illum ad fugiat suscipit officiis nihil beatae
            pariatur autem? Nostrum soluta rerum alias.
          </p>
        </div>
      </div> */}
      <TestComponent />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p> */}

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      s
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
