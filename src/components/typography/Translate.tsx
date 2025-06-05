import React from "react";
import { t } from "i18next";
import Highlighter from "react-highlight-words";
import DOMPurify from "dompurify";

interface TranslateProps extends React.HTMLAttributes<HTMLSpanElement> {
  dataKey?: string | { dataKey: string; params?: Record<string, any> };
  params?: Record<string, any>;
  htmlContent?: boolean;
  required?: boolean;
  textOnly?: boolean;
  print?: boolean;
  block?: boolean;
  shouldTranslate?: boolean;
  short?: boolean;
  search?: string;
}

export const Translate: React.FC<TranslateProps> = ({
  dataKey,
  params = {},
  htmlContent = false,
  required = false,
  textOnly = false,
  print = true,
  block = false,
  shouldTranslate = true,
  short = false,
  search = "",
  ...props
}) => {
  if (!dataKey) return null;

  if (!shouldTranslate) return <>{typeof dataKey === "string" ? dataKey : ""}</>;

  if (typeof dataKey === "object") {
    if ("params" in dataKey && "dataKey" in dataKey) {
      params = dataKey.params || {};
      dataKey = dataKey.dataKey;
    } else {
      return <>{dataKey}</>;
    }
  }

  if (!print) return null;

  let translatedText: string = t(dataKey, params) as string;
  if (typeof translatedText !== "string") {
    translatedText = String(translatedText);
  }

  let highlightedText: React.ReactNode = translatedText;

  let content: React.ReactNode;

  if (search) {
    highlightedText = (
      <Highlighter
        searchWords={search.split(/\s+/)}
        autoEscape
        textToHighlight={translatedText}
      />
    );
  }

  if (short && typeof translatedText === "string") {
    translatedText = translatedText
      .split(" ")
      .map((word) => (word.includes("sup") ? word : word.charAt(0)))
      .join("");
    highlightedText = translatedText;
  }

  if (textOnly) {
    return <>{highlightedText}</>;
  }

  if (!translatedText) return null;

  if (htmlContent && typeof translatedText === "string") {
    content = (
      <span
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(translatedText) }}
        {...props}
      />
    );
  } else {
    content = <span {...props}>{highlightedText}</span>;
  }

  if (required) {
    content = (
      <span>
        {content}
        <sup style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>*</sup>
      </span>
    );
  }

  if (block) {
    return <div>{content}</div>;
  }

  return content;
};

export default Translate;
