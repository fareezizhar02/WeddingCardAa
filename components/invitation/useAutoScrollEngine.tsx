'use client';

import * as React from 'react';

type EngineState = 'idle' | 'running' | 'paused_doa' | 'stopped_user' | 'done';

export type SectionKey =
  | 'contentTop'
  | 'mukadimah'
  | 'details'
  | 'aturcara'
  | 'menghitungHari'
  | 'doa'
  | 'rsvp'
  | 'rsvpCTA'
  | 'responses';

export type SectionRefs = Record<SectionKey, React.RefObject<HTMLElement>>;

type Args = {
  enabled: boolean;
  sectionRefs: SectionRefs;
  startDelayMs?: number;
  resumeChipDelayMs?: number;
};

const DEFAULTS = { startDelayMs: 5500, resumeChipDelayMs: 2000 };

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function getScrollEl(): HTMLElement {
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

async function scrollToEl(el: HTMLElement, block: ScrollLogicalPosition = 'start') {
  el.scrollIntoView({ behavior: 'smooth', block });

  const start = performance.now();
  let last = getScrollEl().scrollTop;
  let stable = 0;

  while (performance.now() - start < 2500) {
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    const now = getScrollEl().scrollTop;
    if (Math.abs(now - last) < 0.5) stable += 1;
    else stable = 0;
    if (stable >= 6) return;
    last = now;
  }
}

export function useAutoScrollEngine({
  enabled,
  sectionRefs,
  startDelayMs = DEFAULTS.startDelayMs,
  resumeChipDelayMs = DEFAULTS.resumeChipDelayMs,
}: Args) {
  const [engineState, setEngineState] = React.useState<EngineState>('idle');
  const [showResumeChip, setShowResumeChip] = React.useState(false);

  const stopReasonRef = React.useRef<'none' | 'user' | 'done'>('none');
  const startTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = React.useCallback(() => {
    if (startTimerRef.current) clearTimeout(startTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    startTimerRef.current = null;
    resumeTimerRef.current = null;
  }, []);

  const stopByUser = React.useCallback(() => {
    if (stopReasonRef.current === 'done') return;

    // ✅ When paused at doa, don't convert to "user stopped".
    // Pause is intentional and Resume button must remain functional.
    if (engineState === 'paused_doa') {
      return;
    }

    stopReasonRef.current = 'user';
    clearTimers();
    setShowResumeChip(false);
    setEngineState('stopped_user');

    // ✅ break any smooth scroll immediately
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });
  }, [clearTimers, engineState]);

  const markDone = React.useCallback(() => {
    stopReasonRef.current = 'done';
    clearTimers();
    setShowResumeChip(false);
    setEngineState('done');
  }, [clearTimers]);

  const pauseAtDoa = React.useCallback(() => {
    if (stopReasonRef.current !== 'none') return;

    clearTimers();
    setEngineState('paused_doa');
    setShowResumeChip(false);

    resumeTimerRef.current = setTimeout(() => {
      if (stopReasonRef.current === 'none') setShowResumeChip(true);
    }, resumeChipDelayMs);
  }, [clearTimers, resumeChipDelayMs]);

  const run = React.useCallback(async () => {
    if (!enabled) return;
    if (stopReasonRef.current !== 'none') return;

    setEngineState('running');

    const getEl = (k: SectionKey) => sectionRefs[k]?.current || null;

    const contentTop = getEl('contentTop');
    if (!contentTop) return;

    await scrollToEl(contentTop, 'start');
    if (stopReasonRef.current !== 'none') return;
    await sleep(7000);

    // const mukadimah = getEl('mukadimah');
    // if (mukadimah) {
    //   await scrollToEl(mukadimah, 'start');
    //   if (stopReasonRef.current !== 'none') return;
    //   await sleep(10000);
    // }

    const details = getEl('details');
    if (details) {
      await scrollToEl(details, 'start');
      if (stopReasonRef.current !== 'none') return;
      await sleep(5000);
    }

    const aturcara = getEl('aturcara');
    if (aturcara) {
      await scrollToEl(aturcara, 'start');
      if (stopReasonRef.current !== 'none') return;
      await sleep(3000);
    }

    const menghitungHari = getEl('menghitungHari');
    if (menghitungHari) {
      await scrollToEl(menghitungHari, 'start');
      if (stopReasonRef.current !== 'none') return;
      await sleep(3000);
    }

    const doa = getEl('doa');
    if (doa) {
      await scrollToEl(doa, 'start');
      if (stopReasonRef.current !== 'none') return;
      await sleep(800);
      pauseAtDoa();
      return;
    }

    const rsvpTarget = getEl('rsvpCTA') || getEl('rsvp');
    if (rsvpTarget) {
      await scrollToEl(rsvpTarget, 'center');
      if (stopReasonRef.current !== 'none') return;
      await sleep(5000);
    }

    const responses = getEl('responses');
    if (responses) await scrollToEl(responses, 'start');

    markDone();
  }, [enabled, sectionRefs, pauseAtDoa, markDone]);

  const start = React.useCallback(() => {
    if (!enabled) return;
    stopReasonRef.current = 'none';
    clearTimers();
    setShowResumeChip(false);
    setEngineState('idle');

    startTimerRef.current = setTimeout(() => {
      run();
    }, startDelayMs);
  }, [enabled, run, startDelayMs, clearTimers]);

  const resumeFromDoa = React.useCallback(async () => {
    if (engineState !== 'paused_doa') return;
    if (stopReasonRef.current !== 'none') return;

    // ✅ break inertia / smooth scroll before we continue
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });

    setShowResumeChip(false);
    clearTimers();
    setEngineState('running');

    const rsvpTarget = sectionRefs.rsvpCTA.current || sectionRefs.rsvp.current;
    if (rsvpTarget) {
      await scrollToEl(rsvpTarget as HTMLElement, 'center');
      if (stopReasonRef.current !== 'none') return;
      await sleep(2000);
    }

    const responses = sectionRefs.responses.current;
    if (responses) await scrollToEl(responses as HTMLElement, 'start');

    markDone();
  }, [engineState, sectionRefs, clearTimers, markDone]);

  React.useEffect(() => {
    clearTimers();

    if (!enabled) {
      stopReasonRef.current = 'none';
      setShowResumeChip(false);
      setEngineState('idle');
      return;
    }

    start();
    return () => clearTimers();
  }, [enabled, start, clearTimers]);

  return {
    engineState,
    showResumeChip,
    start,
    resumeFromDoa,
    stopByUser,
  };
}
