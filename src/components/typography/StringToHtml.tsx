import DOMPurify from "dompurify";

interface StringToHtmlProps {
  text: string;
}

export const StringToHtml = ({ text }: StringToHtmlProps) => (
  <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></span>
);

export default StringToHtml;
