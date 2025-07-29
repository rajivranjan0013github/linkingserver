import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectQuestion() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fallback = `https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`;
    const intent = `intent://Questions/${id}#Intent;scheme=https;package=com.question2;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;

    // Add delay fallback in case intent fails silently
    const timer = setTimeout(() => {
      window.location.href = fallback;
    }, 2500); // enough time to trigger intent

    window.location.replace(intent); // triggers app open

    return () => clearTimeout(timer);
  }, [id]);

  return <p>Redirecting to app...</p>;
}
