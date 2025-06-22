import Translate from "./Translate";

export const HelpCharacterCount = ({ max = 0, min = 0, value = "" }) => {
  const currentLength = value?.length || 0;

  if (max <= 0 && min <= 0) return null;

  const dataKey =
    min > 0 && max > 0
      ? "Typo.MinMaxCharCount"
      : min > 0
      ? "Typo.CharCount"
      : "Typo.MaxCharCount";

  return (
    <Translate
      dataKey={dataKey}
      className="text-orange-900 text-sm !mb-2"
      params={{
        count: max || min,
        mincount: min,
        maxcount: max,
        current: currentLength,
      }}
      htmlContent
    />
  );
};

export default HelpCharacterCount;
