'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FileText, Image as ImageIcon } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileDropzone } from "@/components/FileDropzone"
import { LoadingOverlay } from "@/components/LoadingOverlay"
import {
  MAX_FILE_SIZE,
  ACCEPTED_PDF_TYPES,
  voiceOptions,
  voiceCategories,
} from "@/lib/constants"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  pdfFile: z.any()
    .refine((file) => file instanceof File, "PDF file is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 50MB.`),
  coverImage: z.any()
    .optional()
    .refine((file) => !file || (file instanceof File && file.size <= 10 * 1024 * 1024), `Max image size is 10MB.`),
  title: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author name is required."),
  voice: z.string().min(1, "Please select a voice."),
})

type FormValues = z.infer<typeof formSchema>

export default function UploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "rachel",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    console.log(values)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
  }

  return (
    <>
      {isSubmitting && <LoadingOverlay />}
      <div className="new-book-wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* PDF Upload */}
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Upload Book PDF</FormLabel>
                  <FormControl>
                    <FileDropzone
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={() => field.onChange(null)}
                      icon={FileText}
                      title="Click to upload PDF"
                      hint="PDF file (max 50MB)"
                      accept={{ "application/pdf": [".pdf"] }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Rich Dad Poor Dad"
                      className="form-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Author Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Robert Kiyosaki"
                      className="form-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Voice Selector */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-4"
                    >
                      {Object.entries(voiceCategories).map(([category, voices]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-sm font-semibold capitalize text-[#3d485e]">
                            {category} Voices
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                            {voices.map((voiceKey) => {
                              const voice = voiceOptions[voiceKey as keyof typeof voiceOptions]
                              const isSelected = field.value === voiceKey
                              return (
                                <FormItem key={voiceKey} className="space-y-0">
                                  <FormControl>
                                    <div
                                      className={cn(
                                        "voice-selector-option h-full",
                                        isSelected
                                          ? "voice-selector-option-selected"
                                          : "voice-selector-option-default"
                                      )}
                                      onClick={() => field.onChange(voiceKey)}
                                    >
                                      <RadioGroupItem
                                        value={voiceKey}
                                        id={voiceKey}
                                        className="sr-only"
                                      />
                                      <div className="flex flex-col text-left w-full">
                                        <span className="font-bold text-lg text-[#212a3b]">
                                          {voice.name}
                                        </span>
                                        <span className="text-sm text-[#3d485e]">
                                          {voice.description}
                                        </span>
                                      </div>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image Upload */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Upload Book Cover Image</FormLabel>
                  <FormControl>
                    <FileDropzone
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={() => field.onChange(null)}
                      icon={ImageIcon}
                      title="Click to upload cover image"
                      hint="Leave empty to auto-generate from PDF"
                      accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="form-btn">
              Begin Synthesis
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
