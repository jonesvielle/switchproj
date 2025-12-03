interface InputProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  placeholder?: string;
  type?: string;
}
function Input({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

export default Input;
