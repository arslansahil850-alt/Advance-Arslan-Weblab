import { useEffect, useRef, useState } from "react";
import { CircularMediaLoader } from "./CircularMediaLoader";

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectClassName?: string;
  fallbackLabel?: string;
  priority?: boolean;
  circularSize?: number;
}

export function MediaFrame({
  src,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  aspectClassName = "aspect-[16/10]",
  fallbackLabel,
  priority = false,
  circularSize = 36
}: MediaFrameProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setStatus("loading");
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setStatus("loaded");
      } else {
        setStatus("error");
      }
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${aspectClassName} ${className}`}
      style={{ backgroundColor: "var(--bg-elevated)" }}
    >
      {status === "loading" && <CircularMediaLoader size={circularSize} label={alt} />}

      {status !== "error" ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`${imgClassName} transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center p-4 text-center"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, var(--accent-soft), transparent 65%), var(--bg-elevated)"
          }}
        >
          <span
            className="font-display text-sm font-semibold tracking-wide"
            style={{ color: "var(--accent-bright)" }}
          >
            {fallbackLabel || alt}
          </span>
        </div>
      )}
    </div>
  );
}
