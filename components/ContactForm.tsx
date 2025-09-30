"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { Button } from "./ui/stateful-button";
import { StatefulModal } from "./ui/StatefulModal";

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset
  } = useForm<FormValues>();

  const t = useTranslations("Contact");

  const [success, setSuccess] = React.useState(false);
  const [bTitle, setBtitle] = React.useState(true);
  const [error, setError] = React.useState(false);   // estado para el error


    const onSubmit = async (data: FormValues) => {
        setSuccess(false);
        setBtitle(false);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          console.log("✅ Form submitted successfully");
            setSuccess(true);
            reset();

            setTimeout(() => {
              setSuccess(false); // opcional, para volver a estado inicial
              setBtitle(true);
            }, 4000);
        } else {
          console.error("❌ Error submitting form");
          alert("Something went wrong. Please try again.");

          setError(true);
          setTimeout(() => {
            setError(false); // oculta la X después de la animación
            setBtitle(true);
          }, 4000);
        }
      } catch (error) {
        console.error("❌ Network error:", error);
        alert("Network error. Please try again later.");

        setError(true);
        setTimeout(() => {
          setError(false); // oculta la X después de la animación
          setBtitle(true);
        }, 4000);
      }
    };

  return (
    <div className=" shadow-input mx-auto w-full max-w-md rounded-none px-4 md:px-8 bg-black">
      <h1 className="text-2xl font-bold text-neutral-200 ">
        {t("title")}
      </h1>
      <p className="mt-2 max-w-sm text-md text-neutral-300">
        {t("subtitle")}
      </p>

      <StatefulModal
        title= {t("form.modal.successTitle")}
        desc={t("form.modal.successDesc")}
        open={success}
        onOpenChange={(o) => setSuccess(o)}
      /> 

      <StatefulModal
        title={t("form.modal.errorTitle")}
        desc={t("form.modal.errorDesc")}
        open={error}
        onOpenChange={(o) => setError(o)}
      />

      <form className="my-7" onSubmit={handleSubmit(onSubmit)}>
        {/* First & Last name */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">
              {t("form.firstname")}
            </Label>
            <Input
              id="firstname"
              placeholder={t("form.placeholder.firstname")}
              type="text"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname">
              {t("form.lastname")}
            </Label>
            <Input
              id="lastname"
              placeholder={t("form.placeholder.lastname")}
              type="text"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </LabelInputContainer>
        </div>

        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            {t("form.email")}
          </Label>
          <Input
            id="email"
            placeholder="myemail@example.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        {/* Message */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="message">
            {t("form.message")}
          </Label>
          <Textarea
            id="message"
            placeholder={t("form.placeholder.message")}
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </LabelInputContainer>

        {/* Submit button */}
          <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              success={success}
              bTitle={bTitle}
              error={error}
              className=" group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white"
            >
              {t("form.submit")}
            </Button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
