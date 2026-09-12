import { useRef, useState } from "react";

/**
 * Code block with language tag + hover/focus copy button (SPEC §5.8).
 */
export default function CodeBlock({
  code,
  lang,
  label,
}: {
  code: string;
  lang?: string;
  /** small mono caption rendered above the block (e.g. "ILLUSTRATIVE") */
  label?: string;
}) {
  const btn = useRef<HTMLButtonElement>(null);
  const [ok, setOk] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard API unavailable, fall back to a transient textarea
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setOk(true);
    setTimeout(() => setOk(false), 1400);
  };

  return (
    <div className="codeblock">
      {lang && <span className="lang-tag">{label ?? lang}</span>}
      <button
        ref={btn}
        className={`copy-btn${ok ? " ok" : ""}`}
        onClick={copy}
        aria-label="Copy code to clipboard"
      >
        {ok ? "Copied!" : "Copy"}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
