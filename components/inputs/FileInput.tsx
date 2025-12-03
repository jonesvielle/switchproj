import { CheckCircle, Upload, X } from "lucide-react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface FileInputProps {
  register: UseFormRegister<any>;
  error?: { message?: string };
}

function FileInput({ register, error }: FileInputProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName(null);
      setPreview(null);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setPreview(null);

    const input = document.getElementById("photo-input") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Your Photo (Max 1MB)
      </label>

      <label className="block">
        <input
          {...register("photo", {
            onChange: handleFileChange,
          })}
          id="photo-input"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
        />

        {!fileName ? (
          <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <Upload className="w-12 h-12 text-blue-600 mb-4" />
            <p className="mb-2 text-sm text-gray-600 text-center px-4">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">JPG, PNG, WebP up to 1MB</p>
          </div>
        ) : (
          <div className="relative p-6 bg-green-50 border-2 border-green-300 rounded-2xl">
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-3 right-3 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl shadow-md"
                />
              ) : (
                <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                  {fileName}
                </p>
                <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle className="w-4 h-4" />
                  Photo ready to upload
                </p>
              </div>
            </div>
          </div>
        )}
      </label>

      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

export default FileInput;
