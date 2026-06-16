"use client";

import { useSyncExternalStore, useCallback } from "react";

function getSnapshot(query) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

function subscribe(query, callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(query);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function useReducedMotion() {
  const q = "(prefers-reduced-motion: reduce)";
  const getSnapshotMemo = useCallback(() => getSnapshot(q), []);
  const subscribeMemo = useCallback((cb) => subscribe(q, cb), []);
  return useSyncExternalStore(
    subscribeMemo,
    getSnapshotMemo,
    getServerSnapshot,
  );
}

export function useIsTouchDevice() {
  const q = "(pointer: coarse)";
  const getSnapshotMemo = useCallback(() => getSnapshot(q), []);
  const subscribeMemo = useCallback((cb) => subscribe(q, cb), []);
  return useSyncExternalStore(
    subscribeMemo,
    getSnapshotMemo,
    getServerSnapshot,
  );
}
