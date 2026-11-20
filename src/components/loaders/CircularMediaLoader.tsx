interface CircularMediaLoaderProps {
  size?: number;
  label?: string;
}

export function CircularMediaLoader({ size = 36, label = "Loading media" }: CircularMediaLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
    >
      <div
        className="circular-media-ring rounded-full border-2 border-transparent"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: "var(--accent-bright)",
          borderRightColor: "var(--accent)",
          borderBottomColor: "var(--border-subtle)"
        }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
