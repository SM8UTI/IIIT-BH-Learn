/* eslint-disable react/prop-types */
const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-text/70 text-sm">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="border border-text/20 p-3 placeholder:font-normal py-2 text-base bg-background/10 font-medium outline-none focus:outline-none focus:ring-1 focus:ring-primary rounded-md text-text"
      onChange={onChange}
      value={value}
      aria-label={label}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
