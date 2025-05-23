import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <Head>
        <title>Page Not Found | AI Chargeback Manager</title>
        <meta name="description" content="Page not found" />
      </Head>
      
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}