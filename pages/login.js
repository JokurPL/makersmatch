import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { signIn, useSession } from 'next-auth/client';

export default function Login() {
  const [signing, setSigning] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();

  const handleGitubLogin = async (e) => {
    e.preventDefault();
    setSigning(true);
    await signIn('github');
  };

  useEffect(() => {
    if (session && !loading) {
      router.push('/');
    }
  }, [session, loading]);

  return (
    <div>
      <section className="h-screen py-10 lg:py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="mb-10 text-center ">
              <Link href="/">
                <a className="text-white text-3xl font-bold leading-none">MakersMatch</a>
              </Link>
            </div>
            <div className="p-6 lg:p-12 bg-white shadow-md rounded">
              <div className="mb-6 px-3 text-center">
                <span className="text-gray-500">Sign In</span>
                <h3 className="text-2xl font-bold">Join our community</h3>
              </div>
              <form>
                <div className="text-center">
                  <button
                    className="focus:outline-none mt-8 mb-4 p-4 w-full flex justify-center items-center border rounded hover:bg-gray-50"
                    onClick={handleGitubLogin}>
                    <img className="mr-4 w-6" src="/github.svg" alt="" />
                    <span className="text-xs text-gray-500 font-bold">
                      {signing ? 'Signing in...' : 'Sign In with your GitHub'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
