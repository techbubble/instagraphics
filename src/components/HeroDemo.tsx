"use client";

import { useEffect, useRef, useState } from "react";

export type HeroScene = {
  layout: string;
  font: string;
  colors: string[];
  svg: string; // animated (SMIL) SVG markup, rendered server-side
  ms: number; // how long to show it: full reveal plus a hold
};

const TYPE_MS = 38;
const LINE_PAUSE_MS = 220;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Plays the real workflow: text is typed into the fields, the graphic draws
// itself, then the same text moves through layouts and brand kits.
export default function HeroDemo({ lines, scenes }: { lines: string[]; scenes: HeroScene[] }) {
  const [typed, setTyped] = useState<string[]>(() => lines.map(() => ""));
  const [typing, setTyping] = useState(true);
  const [scene, setScene] = useState(0);
  const [reduced, setReduced] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- matchMedia is client-only
    setReduced(prefersReducedMotion());
  }, []);

  // Typing phase.
  useEffect(() => {
    if (!typing || reduced) return;
    let line = 0;
    let ch = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (line >= lines.length) {
        setTyping(false);
        return;
      }
      ch++;
      const at = line;
      const text = lines[line].slice(0, ch);
      setTyped((prev) => prev.map((v, i) => (i === at ? text : v)));
      if (ch >= lines[line].length) {
        line++;
        ch = 0;
        timer = setTimeout(tick, LINE_PAUSE_MS);
      } else {
        timer = setTimeout(tick, TYPE_MS);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [typing, reduced, lines]);

  // Cycle layouts once the text is in; after the last one, retype.
  useEffect(() => {
    if (typing || reduced) return;
    const timer = setTimeout(() => {
      if (scene === scenes.length - 1) {
        setScene(0);
        setTyped(lines.map(() => ""));
        setTyping(true);
      } else {
        setScene(scene + 1);
      }
    }, scenes[scene].ms);
    return () => clearTimeout(timer);
  }, [typing, reduced, scene, scenes, lines]);

  // Restart the SVG's own animation timeline whenever a graphic mounts.
  // With reduced motion, jump to the finished frame and hold it.
  useEffect(() => {
    if (typing && !reduced) return;
    const svg = stageRef.current?.querySelector("svg") as SVGSVGElement | null;
    if (!svg) return;
    if (reduced) {
      svg.setCurrentTime?.(60);
      svg.pauseAnimations?.();
    } else {
      svg.setCurrentTime?.(0);
    }
  }, [typing, scene, reduced]);

  const s = scenes[scene];
  const isTyping = typing && !reduced;
  const shown = reduced ? lines : typed;
  const activeLine = isTyping ? typed.findIndex((v, i) => v.length < lines[i].length) : -1;

  return (
    <div className="ig-stage">
      <div className="ig-stage-bar">
        <span className="ig-dot" style={{ background: "#f55151" }} />
        <span className="ig-dot" style={{ background: "#ffc107" }} />
        <span className="ig-dot" style={{ background: "#3be8bd" }} />
        <span className="ig-stage-url">instagraphic.app</span>
      </div>
      <div className="row g-3 p-3">
        <div className="col-sm-5">
          <div className="ig-stage-label">Content</div>
          {lines.map((line, i) => (
            <div key={i} className={`ig-field ${i === activeLine ? "ig-field-active" : ""}`}>
              <span className="ig-field-num">{i + 1}</span>
              <span className={i === activeLine ? "ig-caret" : ""}>{shown[i]}</span>
            </div>
          ))}
          <div className="ig-stage-label mt-3">Brand</div>
          <div className="d-flex gap-1 mb-2">
            {s.colors.map((c, i) => (
              <span key={i} className="ig-swatch" style={{ background: c }} />
            ))}
          </div>
          <div className="ig-font-chip" style={{ fontFamily: s.font }}>
            Aa <span className="opacity-75">{s.font}</span>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="ig-canvas" aria-live="polite">
            {isTyping ? (
              <div className="ig-canvas-wait">
                <span>Preview</span>
              </div>
            ) : (
              <div
                key={scene}
                ref={stageRef}
                className="ig-canvas-svg"
                role="img"
                aria-label={`${s.layout} graphic`}
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
            )}
            <span className="ig-layout-chip">{isTyping ? "Typing..." : s.layout}</span>
            {!isTyping && !reduced && <span key={`p${scene}`} className="ig-progress" style={{ animationDuration: `${s.ms}ms` }} />}
          </div>
          <div className="d-flex justify-content-center gap-2 mt-2">
            {scenes.map((sc, i) => (
              <button
                key={sc.layout}
                type="button"
                className={`ig-scene-dot ${!isTyping && i === scene ? "active" : ""}`}
                aria-label={`Show ${sc.layout}`}
                onClick={() => {
                  setTyped(lines);
                  setTyping(false);
                  setScene(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
