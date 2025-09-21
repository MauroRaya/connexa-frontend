type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
