export const validateNoLeadingTrailingSpaces = (value: string) => {
  if (value.trim().length !== value.length) {
    return "No leading or trailing spaces allowed";
  }
  return true;
};

export const validateRequiredSelection = (
  value: string,
  allowedValues: string[],
  message = "Invalid selection"
) => {
  const trimmed = value.trim();
  if (!trimmed) return "This field is required";
  if (!allowedValues.includes(trimmed)) return message;
  return true;
};

export const validateMinLength = (value: string, min: number) => {
  if (value.length < min) return `Must be at least ${min} characters`;
  return true;
};

export const validateMaxLength = (value: string, max: number) => {
  if (value.length > max) return `Must be at most ${max} characters`;
  return true;
};

// Checks if value is required and non-empty
export const validateRequired = (
  value: string,
  message = "This field is required"
) => {
  if (!value || value.trim() === "") {
    return message;
  }
  return true;
};

// Checks if value is in allowed set (case-insensitive)
export const validateAllowedValues = (
  value: string,
  allowedValues: string[],
  message = "Invalid selection"
) => {
  const trimmed = value.trim().toLowerCase();
  const allowedLower = allowedValues.map((v) => v.toLowerCase());
  if (!allowedLower.includes(trimmed)) {
    return message;
  }
  return true;
};
