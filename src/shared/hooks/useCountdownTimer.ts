// src/shared/hooks/useCountdownTimer.ts
'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface UseCountdownTimerProps {
  targetTimestamp: number | null; // Mốc thời gian hết hạn (Unix ms)
  onExpire?: () => void;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/** Chỉ true sau khi đã mount ở client (tránh lệch SSR/hydration mà không cần setState trong effect) */
function useIsMounted() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function useCountdownTimer({ targetTimestamp, onExpire }: UseCountdownTimerProps) {
  // Chỉ lấy Date.now() ở client, trả null khi prerender để Cache Components không chặn build
  const [now, setNow] = useState<number | null>(() =>
    typeof window !== 'undefined' ? Date.now() : null
  );
  const isMounted = useIsMounted();

  // Giữ callback mới nhất mà không cần khởi tạo lại interval
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!targetTimestamp) return;

    const interval = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= targetTimestamp) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const isReady = now !== null;
  const secondsLeft = targetTimestamp !== null && now !== null
    ? Math.max(0, Math.floor((targetTimestamp - now) / 1000))
    : 0;
  const isExpired = isMounted && isReady && targetTimestamp !== null && secondsLeft <= 0;

  // Chỉ bắn onExpire đúng 1 lần cho mỗi mốc hết hạn
  const hasFiredRef = useRef(false);
  useEffect(() => {
    if (!isExpired) {
      hasFiredRef.current = false;
      return;
    }
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    onExpireRef.current?.();
  }, [isExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    isMounted,
    isReady,
    secondsLeft,
    formatted,
    isExpired,
  };
}
