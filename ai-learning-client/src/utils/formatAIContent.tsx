import React from "react";

export const formatAIContent = (
  content: string
) => {
  const lines = content.split("\n");

  return lines.map(
    (line, index) => {
      const trimmed =
        line.trim();

      // Empty Line
      if (!trimmed) {
        return (
          <div
            key={index}
            className="h-2"
          />
        );
      }

      // ### Heading
      if (
        trimmed.startsWith("###")
      ) {
        return (
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
            {trimmed.replace(
              /^###\s*/,
              ""
            )}
          </h3>
        );
      }

      // Full Bold Heading
      if (
        /^\*\*.*\*\*$/.test(
          trimmed
        ) &&
        !trimmed.includes(
          ":"
        )
      ) {
        return (
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
            {trimmed.replace(
              /\*\*/g,
              ""
            )}
          </h2>
        );
      }

      // Bullet Point
      if (
        trimmed.startsWith(
          "* "
        ) ||
        trimmed.startsWith(
          "- "
        )
      ) {
        return (
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
      trimmed.replace(
        /^[-*]\s*/,
        ""
      )
    )}
  </div>
</div>
        );
      }

      // Paragraph
      return (
        <p
          key={index}
          className="
            text-slate-700
            leading-7
            break-words
          "
        >
          {renderInlineFormatting(
            trimmed
          )}
        </p>
      );
    }
  );
};

const renderInlineFormatting =
  (text: string) => {
    const parts =
      text.split(
        /(\*\*.*?\*\*|`.*?`)/
      );

    return parts.map(
      (part, index) => {
        // Bold
        if (
          /^\*\*.*?\*\*$/.test(
            part
          )
        ) {
          return (
            <strong
              key={index}
              className="
                font-semibold
                text-slate-900
              "
            >
              {part.replace(
                /\*\*/g,
                ""
              )}
            </strong>
          );
        }

        // Inline Code
        if (
          /^`.*`$/.test(part)
        ) {
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
              {part.replace(
                /`/g,
                ""
              )}
            </code>
          );
        }

        return part;
      }
    );
  };