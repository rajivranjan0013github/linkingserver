import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectQuestion() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const deepLink = `https://com.question2/Questions/${id}`;
    const playStore = `https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`;

    const timeout = setTimeout(() => {
      window.location.href = playStore;
    }, 1500); // Wait for app open; if fails, redirect

    window.location.href = deepLink;

    return () => clearTimeout(timeout);
  }, [id]);

  return <p>Redirecting to app or Play Store...</p>;
}
