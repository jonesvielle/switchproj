"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import Input from "./inputs/Input";
import Select from "./inputs/Select";
import FileInput from "./inputs/FileInput";

const MAX_FILE_SIZE = 1_000_000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email("Invalid email")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Only Gmail accounts allowed",
    }),
  phonenumber: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Use international format e.g. +2348012345678"
    ),
  country: z.string().min(1, "Please select your country"),
  photo: z
    .any()
    .refine((files) => files?.length === 1, "Photo is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max 1MB")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only JPG, PNG, WebP allowed"
    ),
});

type FormData = z.infer<typeof schema>;

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", data.photo[0]);
      formData.append("upload_preset", "quickteller_preset");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      ).then((r) => r.json());

      if (!cloudinaryRes.secure_url) throw new Error("Photo upload failed");

      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phonenumber: data.phonenumber,
          country: data.country,
          photoUrl: cloudinaryRes.secure_url,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Reservation failed");
      }

      setSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err?.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50">
        <div className="bg-quickblue px-10 py-12 text-white text-center">
          <h1 className="text-4xl font-bold">Reserve Your Spot</h1>
          <p className="mt-3 text-blue-100 text-lg">
            Limited seats • High demand • Act fast!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Input
              label="First Name"
              name="firstname"
              register={register}
              error={errors.firstname}
              placeholder="Chukwudi"
            />
            <Input
              label="Last Name"
              name="lastname"
              register={register}
              error={errors.lastname}
              placeholder="Okonkwo"
            />
          </div>

          <Input
            label="Email Address (Gmail only)"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="you@gmail.com"
          />

          <Input
            label="Phone Number"
            name="phonenumber"
            register={register}
            error={errors.phonenumber}
            placeholder="+234 801 234 5678"
          />

          <Select
            label="Country"
            name="country"
            register={register}
            error={errors.country}
          />

          <FileInput register={register} error={errors.photo} />

          {error && (
            <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-5 bg-green-50 border border-green-200 rounded-xl text-green-700">
              <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-bold">Reservation Successful!</p>
                <p className="text-sm">
                  Check your Gmail for confirmation email.
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-blue-600  hover:bg-blue-700 text-white text-xl font-bold rounded-2xl shadow-xl transform transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing Reservation..." : "Reserve My Spot Now"}
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
}
