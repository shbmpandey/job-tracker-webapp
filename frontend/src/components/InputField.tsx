import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        className="peer w-full px-4 py-3 text-white bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
      />
      <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:text-white/50 peer-focus:top-1 peer-focus:text-sm peer-focus:text-white">
        {label}
      </label>
    </div>
  );
};

export default InputField;
