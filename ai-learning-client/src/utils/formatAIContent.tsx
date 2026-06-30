import React from "react";

export const formatAIContent = (
  content: string
): React.ReactNode[] => {
  const lines = content.split("\n");

  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLanguage = "";

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // ==========================
    // CODE BLOCKS
    // ==========================
    if (trimmed.startsWith("```")) {
      // Opening block
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = trimmed.replace("```", "").trim();
        return;
      }

      // Closing block
      elements.push(
        <div key={`code-wrapper-${index}`} className="my-4">
          {codeLanguage && (
            <div
              className="
                rounded-t-lg
                bg-slate-800
                px-4
                py-2
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-slate-300
              "
            >
              {codeLanguage}
            </div>
          )}

          <pre
            className={`
              overflow-x-auto
              bg-slate-900
              p-4
              text-sm
              text-slate-100
              ${
                codeLanguage
                  ? "rounded-b-lg"
                  : "rounded-lg"
              }
            `}
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );

      inCodeBlock = false;
      codeLines = [];
      codeLanguage = "";

      return;
    }

    // Collect code block lines
    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // ==========================
    // EMPTY LINE
    // ==========================
    if (!trimmed) {
      elements.push(
        <div
          key={`space-${index}`}
          className="h-2"
        />
      );
      return;
    }

    // ==========================
    // H3 HEADING
    // ==========================
    if (trimmed.startsWith("###")) {
      elements.push(
        <h3
          key={index}
          className="
            mt-6
            mb-3
            text-xl
            font-bold
            text-slate-900
          "
        >
          {trimmed.replace(/^###\s*/, "")}
        </h3>
      );
      return;
    }

    // ==========================
    // FULL BOLD HEADING
    // ==========================
    if (
      /^\*\*.*\*\*$/.test(trimmed) &&
      !trimmed.includes(":")
    ) {
      elements.push(
        <h2
          key={index}
          className="
            mt-5
            mb-3
            text-lg
            font-semibold
            text-slate-900
          "
        >
          {trimmed.replace(/\*\*/g, "")}
        </h2>
      );
      return;
    }

    // ==========================
    // BULLET POINT
    // ==========================
    if (
      trimmed.startsWith("* ") ||
      trimmed.startsWith("- ")
    ) {
      elements.push(
        <div
          key={index}
          className="
            flex
            gap-3
            pl-2
            text-slate-700
            leading-7
          "
        >
          <span
            className="
              mt-[10px]
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-slate-500
            "
          />

          <div>
            {renderInlineFormatting(
              trimmed.replace(/^[-*]\s*/, "")
            )}
          </div>
        </div>
      );
      return;
    }

    // ==========================
    // PARAGRAPH
    // ==========================
    elements.push(
      <p
        key={index}
        className="
          text-slate-700
          leading-7
          break-words
        "
      >
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });

  // Handle unclosed code block
  if (inCodeBlock && codeLines.length > 0) {
    elements.push(
      <pre
        key="unclosed-code-block"
        className="
          my-4
          overflow-x-auto
          rounded-lg
          bg-slate-900
          p-4
          text-sm
          text-slate-100
        "
      >
        <code>{codeLines.join("\n")}</code>
      </pre>
    );
  }

  return elements;
};

const renderInlineFormatting = (
  text: string
): React.ReactNode[] => {
  const parts = text.split(
    /(\*\*.*?\*\*|`.*?`)/
  );

  return parts.map((part, index) => {
    // Bold
    if (/^\*\*.*?\*\*$/.test(part)) {
      return (
        <strong
          key={index}
          className="
            font-semibold
            text-slate-900
          "
        >
          {part.replace(/\*\*/g, "")}
        </strong>
      );
    }

    // Inline code
    if (/^`.*`$/.test(part)) {
      return (
        <code
          key={index}
          className="
            rounded-md
            bg-slate-200
            px-1.5
            py-0.5
            text-sm
            font-medium
            text-emerald-600
          "
        >
          {part.replace(/`/g, "")}
        </code>
      );
    }

    return part;
  });
};

