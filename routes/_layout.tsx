import { PageProps } from "fresh";

export default function Layout({ Component }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 space-x-12">
            <a href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
              Home
            </a>
            <a 
              href="/" 
              className="text-base font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
            >
              Coming soon...
            </a>
          </div>
        </div>
      </nav>
      <main>
        <Component />
      </main>
    </div>
  );
}
