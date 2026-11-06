export interface FormField {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "checkbox"
    | "tel"
    | "number";
  options?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  required?: boolean;
  helper?: string;
  defaultValue?: string;
  maxLength?: number;
  minLength?: number;
}
export const privacyField: FormField = {
  name: "privacyAccepted",
  type: "checkbox",
  label:
    "I have read how this form uses my information and agree to submit it for human review.",
  required: true,
};
export const ageOptions = ["13–15", "16–17", "18–20"].map((a) => ({
  value: a,
  label: a,
}));
