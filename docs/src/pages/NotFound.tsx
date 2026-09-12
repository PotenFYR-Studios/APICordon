/** Rendered for unmatched routes (served via GitHub Pages 404.html). */
export default function NotFound() {
  return (
    <div className="dot-backdrop">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-28 text-center">
        <div className="mono-label mb-4">404 · No route</div>
        <h1 className="grad-text text-[clamp(2.2em,5vw,3.4em)] font-extrabold tracking-tight">
          Nothing is cordoned off here
        </h1>
        <p className="mt-4 max-w-[480px] text-[0.95em] leading-relaxed text-muted">
          The page you asked for does not exist, or it moved. The docs index
          is a good place to rejoin the pipeline.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="/docs/" className="btn btn-primary btn-sm">
            Open the docs
          </a>
          <a href="/" className="btn btn-ghost btn-sm">
            Back to the landing page
          </a>
        </div>
      </div>
    </div>
  );
}
