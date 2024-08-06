import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-yellow-500 bg-gray-500">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-8 text-xl">Sorry, the page you are looking for does not exist.</h2>

      <Link href="/" className="px-4 py-2 font-bold text-white rounded bg-zinc-800 hover:bg-zinc-700 hover:text-white">
        Go Back Home
      </Link>
    </div>
  );
}
