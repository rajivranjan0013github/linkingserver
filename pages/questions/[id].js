import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function RedirectQuestion() {
  const router = useRouter();
  const { id } = router.query;
  const anchorRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fallbackUrl = `https://play.google.com/store/apps/details?id=com.question2&referrer=question=${id}`;
    const intentUrl = `intent://Questions/${id}#Intent;scheme=https;package=com.question2;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;

    // Use <a> to trigger intent instead of window.location.href
    anchorRef.current.href = intentUrl;
    anchorRef.current.click();

    // Fallback after timeout
    const timeout = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <>
      <p>Redirecting to app or Play Store...</p>
      <a ref={anchorRef} style={{ display: 'none' }} />
    </>
  );
}
