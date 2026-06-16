"use client";

import { useEffect, useRef } from "react";

const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js";
const PROJECT_ID = "eFzQTZbDZCkoUAL0fhfP";
const ELEMENT_ID = "unicorn-bg-scene";

type UnicornScene = { destroy: () => void };

declare global {
  interface Window {
    UnicornStudio?: {
      addScene: (config: {
        elementId: string;
        projectId: string;
        scale: number;
        dpi: number;
        fps: number;
        fixed: boolean;
      }) => Promise<UnicornScene>;
    };
  }
}

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: UnicornScene | undefined;
    let forwardCleanup: (() => void) | undefined;

    const initScene = async () => {
      const container = containerRef.current;
      if (!container || !window.UnicornStudio) return;

      try {
        scene = await window.UnicornStudio.addScene({
          elementId: ELEMENT_ID,
          projectId: PROJECT_ID,
          scale: 1,
          dpi: 1.5,
          fps: 60,
          fixed: true,
        });

        const forward = (e: MouseEvent) =>
          container.dispatchEvent(new MouseEvent(e.type, e));

        document.addEventListener("mousemove", forward);
        document.addEventListener("mouseenter", forward);
        document.addEventListener("mouseleave", forward);

        forwardCleanup = () => {
          document.removeEventListener("mousemove", forward);
          document.removeEventListener("mouseenter", forward);
          document.removeEventListener("mouseleave", forward);
        };
      } catch (err) {
        console.error("[ShaderBackground] init failed:", err);
      }
    };

    const boot = () => initScene();

    if (window.UnicornStudio) {
      boot();
    } else {
      const script = document.createElement("script");
      script.src = SDK_URL;
      script.onload = boot;
      document.head.appendChild(script);
    }

    return () => {
      forwardCleanup?.();
      scene?.destroy();
    };
  }, []);

  return (
    <div
      id={ELEMENT_ID}
      ref={containerRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
}
