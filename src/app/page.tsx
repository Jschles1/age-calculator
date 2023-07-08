"use client";

import * as React from "react";
import * as z from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DAY_ERROR,
  MONTH_ERROR,
  VALID_YEAR_ERROR,
  EXCEEDED_YEAR_ERROR,
  REQUIRED_ERROR,
  INVALID_DATE_ERROR,
} from "@/lib/constants";
import {
  isValuePresent,
  isValidDay,
  isValidMonth,
  isValidYear,
  isExceededYear,
  isValidDate,
} from "@/lib/validation";
import { Separator } from "@/components/ui/separator";
import IconArrow from "public/images/icon-arrow.svg";

const formSchema = z.object({
  day: z
    .string()
    .refine(isValuePresent, { message: REQUIRED_ERROR })
    .refine(isValidDay, { message: DAY_ERROR }),
  month: z
    .string()
    .refine(isValuePresent, { message: REQUIRED_ERROR })
    .refine(isValidMonth, { message: MONTH_ERROR }),
  year: z
    .string()
    .refine(isValuePresent, { message: REQUIRED_ERROR })
    .refine(isValidYear, { message: VALID_YEAR_ERROR })
    .refine(isExceededYear, { message: EXCEEDED_YEAR_ERROR }),
});

type FormSchema = z.infer<typeof formSchema>;
type AgeResult = {
  years: number | "- -";
  months: number | "- -";
  days: number | "- -";
};

function subtractDateFromCurrent(
  month: string,
  day: string,
  year: string
): AgeResult {
  // Create a new date object for the current date
  const currentDate = new Date();

  // Create a new date object from the provided date
  const providedDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );

  let yearsDifference = currentDate.getFullYear() - providedDate.getFullYear();
  let monthsDifference = currentDate.getMonth() - providedDate.getMonth();
  let daysDifference = currentDate.getDate() - providedDate.getDate();

  // Now we need to correct for the cases where subtraction might result in negative values
  if (monthsDifference < 0 || (monthsDifference === 0 && daysDifference < 0)) {
    yearsDifference--;
    monthsDifference += 12;
  }

  if (daysDifference < 0) {
    const daysInLastFullMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    daysDifference += daysInLastFullMonth;
    monthsDifference--;

    if (monthsDifference < 0) {
      monthsDifference += 12;
      yearsDifference--;
    }
  }

  return {
    days: daysDifference,
    months: monthsDifference,
    years: yearsDifference,
  };
}

export default function Home() {
  const [result, setResult] = React.useState<AgeResult>({
    years: "- -",
    months: "- -",
    days: "- -",
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  function onSubmit(values: FormSchema) {
    const { day, month, year } = values;
    const dateObj = `${year}-${month}-${day}`;
    if (isValidDate(dateObj)) {
      const ageResult = subtractDateFromCurrent(month, day, year);
      setResult(ageResult);
    } else {
      form.setError("day", { message: INVALID_DATE_ERROR });
    }
  }

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <>
      <h1 className="hidden">Age Calculator</h1>
      <main className="px-4 pt-[5.5rem] pb-[14.875rem] mx-auto max-w-[1440px] lg:px-[18.75rem] lg:pt-[10.688rem] lg:pb-[6.813rem]">
        <div className="bg-white px-6 py-12 rounded-3xl rounded-br-[6.25rem] lg:p-14">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-center gap-4 lg:gap-8">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                      <FormControl className="mb-2">
                        <Input
                          placeholder="DD"
                          maxLength={2}
                          {...field}
                          error={form.formState.errors.day?.message}
                        />
                      </FormControl>
                      {hasErrors && (
                        <div className="h-[21px]">
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl className="mb-2">
                        <Input
                          placeholder="MM"
                          maxLength={2}
                          {...field}
                          error={form.formState.errors.month?.message}
                        />
                      </FormControl>
                      {hasErrors && (
                        <div className="h-[21px]">
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl className="mb-2">
                        <Input
                          placeholder="YYYY"
                          maxLength={4}
                          {...field}
                          error={form.formState.errors.year?.message}
                        />
                      </FormControl>
                      {hasErrors && (
                        <div className="h-[21px]">
                          <FormMessage />
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative my-8 py-8 lg:my-0 lg:py-12">
                <Separator className="-z-1" />
                <button
                  type="submit"
                  className="absolute mx-auto p-4 lg:p-0 left-0 right-0 bg-fuschia hover:bg-black focus:bg-black w-16 h-16 lg:w-[96px] lg:h-[96px] rounded-full flex items-center justify-center top-0 lg:left-auto lg:mx-0"
                >
                  <Image src={IconArrow} alt="Down Arrow Icon" />
                </button>
              </div>
            </form>
          </Form>

          <div>
            <p className="italic font-extrabold tracking-tighter text-[3.5rem] leading-[110%] lg:text-[6.5rem]">
              <span className="text-fuschia">{result.years}</span>{" "}
              {result.years === 1 ? "year" : "years"}
            </p>
            <p className="italic font-extrabold tracking-tighter text-[3.5rem] leading-[110%] lg:text-[6.5rem]">
              <span className="text-fuschia">{result.months}</span>{" "}
              {result.months === 1 ? "month" : "months"}
            </p>
            <p className="italic font-extrabold tracking-tighter text-[3.5rem] leading-[110%] lg:text-[6.5rem]">
              <span className="text-fuschia">{result.days}</span>{" "}
              {result.days === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
