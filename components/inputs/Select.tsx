import { COUNTRIES } from "@/utils/helper";

interface SelectProps {
  label: string;
  name: string;
  register: any;
  error?: any;
}

function Select({ label, name, register, error }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          {...register(name)}
          className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl appearance-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 cursor-pointer text-gray-700"
        >
          <option value="">Choose your country</option>
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

export default Select;
