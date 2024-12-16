"use client";

import "react"
import { useEffect, useState } from "react";

export default function Lottery() {
  const [countdown, setCountdown] = useState("")
  const cdTime = Date.UTC(2025, 0, 1)

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(dateDiff(Date.now(), cdTime))
    }, 1000);
    return () => {
      clearInterval(t);
    }
  }, [cdTime])

  function dateDiff(d1: number, d2: number): string {
    const ms = d2 - d1
    let s = Math.floor(ms / 1000);
    let m = Math.floor(s / 60);
    s -= m * 60;
    let h = Math.floor(m / 60);
    m -= h * 60;
    const d = Math.floor(h / 24);
    h -= d * 24;
    return `${d}:${h}:${m}:${s}`;
  }

  return (
    <div className="text-text">{countdown}</div>
  )
}
