import { useEffect, useState } from 'react';
import { imagesAPI } from '../lib/api';

// Simple in-memory cache for signed URLs
const signedUrlCache: { [id: string]: { url: string; expires: number } } = {};
const CACHE_TTL = 4 * 60 * 1000; // 4 minutes (signed URL usually 5 minutes)

export function useSignedImageUrl(imageId?: string, fallbackUrl?: string) {
  const [url, setUrl] = useState<string>(fallbackUrl || '');
  useEffect(() => {
    if (!imageId) return;
    let isMounted = true;
    const now = Date.now();
    const cached = signedUrlCache[imageId];
    if (cached && cached.expires > now) {
      setUrl(cached.url);
      return;
    }
    imagesAPI.getSignedUrl(imageId)
      .then((signed) => {
        if (isMounted) setUrl(signed);
        signedUrlCache[imageId] = { url: signed, expires: now + CACHE_TTL };
      })
      .catch(() => { if (isMounted && fallbackUrl) setUrl(fallbackUrl); });
    return () => { isMounted = false; };
  }, [imageId, fallbackUrl]);
  return url;
}