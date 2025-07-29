import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectQuestion() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fallbackUrl = `https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`;
    const intentUrl = `intent://Questions/${id}#Intent;scheme=https;package=com.question2;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;

    // Create iframe to open the app
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);

    // Fallback after 2 seconds
    const timeout = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000);

    return () => {
      clearTimeout(timeout);
      document.body.removeChild(iframe);
    };
  }, [id]);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Redirecting...</h2>
      <p>Trying to open the app.</p>
    </div>
  );
}
