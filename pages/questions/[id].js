import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectQuestion() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fallbackUrl = encodeURIComponent(`https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`);
      const intentUrl = `intent://Questions/${id}#Intent;scheme=https;package=com.question2;S.browser_fallback_url=${fallbackUrl};end`;

      const timeout = setTimeout(() => {
        // Fallback in case intent doesn't work
        window.location.href = `https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`;
      }, 2000);

      // Try to open the app
      window.location.href = intentUrl;

      return () => clearTimeout(timeout);
    }
  }, [id]);

  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Redirecting to app or Play Store...</h1>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => window.location.href = `https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`}>
      Download from Play Store
    </button>
  </div>;
}
