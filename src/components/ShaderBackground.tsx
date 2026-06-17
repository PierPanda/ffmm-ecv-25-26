"use client";

import { useEffect, useRef } from "react";
import { unicornSdkUrl, unicornProjectId } from '@/server/public-env';

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
    let injectedScript: HTMLScriptElement | undefined;

    const initScene = async () => {
      const container = containerRef.current;
      if (!container || !window.UnicornStudio) return;

      try {
        scene = await window.UnicornStudio.addScene({
          elementId: ELEMENT_ID,
          projectId: unicornProjectId,
          scale: 1,
          dpi: 1.5,
          fps: 60,
          fixed: true,
        });

        const forward = (e: MouseEvent) =>
          container.dispatchEvent(
            new MouseEvent(e.type, {
              bubbles: true,
              cancelable: e.cancelable,
              view: e.view,
              clientX: e.clientX,
              clientY: e.clientY,
              screenX: e.screenX,
              screenY: e.screenY,
              movementX: e.movementX,
              movementY: e.movementY,
              buttons: e.buttons,
              button: e.button,
              relatedTarget: e.relatedTarget,
            }),
          );

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
      script.src = unicornSdkUrl;
      script.onload = boot;
      document.head.appendChild(script);
      injectedScript = script;
    }

    return () => {
      forwardCleanup?.();
      scene?.destroy();
      injectedScript?.remove();
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
