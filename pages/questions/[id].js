// pages/question/[id].js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectQuestion() {
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (id) {
      const fallbackUrl = encodeURIComponent(`https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`);
      const intentUrl = `intent://Questions/${id}#Intent;scheme=https;package=com.question2;S.browser_fallback_url=${fallbackUrl};end`;

      window.location.href = intentUrl;
    }
  }, [id]);

  return <p>Redirecting to app or Play Store...</p>;
}

