"use client"

import { ContactFormData, contactSchema } from '@/lib/schemas/contact'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from 'lucide-react';
import { toast } from "sonner";

export default function ContactForm() {
 const {register, 
        handleSubmit, 
        formState: {errors, isSubmitting }, 
        reset ,} = useForm<ContactFormData>({
         resolver: zodResolver(contactSchema),
        });

    const onSubmit = async (data: ContactFormData) => {
      try {
        const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if(!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Message sent successfully!")

      reset();

      } catch(error) {
        toast.error(
        error instanceof Error ? error.message : "Something went wrong."
        )
      }
     
    }
    
  return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
  <div>
    <label htmlFor="name" className="block text-xs font-medium text-foreground/80 mb-2">
      Your Name
    </label>
    <input
      id="name"
      type="text"
      {...register("name")}
      placeholder="Sara"
      className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200"
    />
    {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
  </div>

  <div>
    <label htmlFor="email" className="block text-xs font-medium text-foreground/80 mb-2">
      Email
    </label>
    <input
      id="email"
      type="email"
      {...register("email")}
      placeholder="example@gmail.com"
      className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200"
    />
    {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
  </div>

  <div>
    <label htmlFor="subject" className="block text-xs font-medium text-foreground/80 mb-2">
      Subject
    </label>
    <input
      id="subject"
      type="text"
      {...register("subject")}
      placeholder="Subject"
      className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200"
    />
    {errors.subject && <p className="text-xs text-red-500 mt-1.5">{errors.subject.message}</p>}
  </div>

  <div>
    <label htmlFor="message" className="block text-xs font-medium text-foreground/80 mb-2">
      Message
    </label>
    <textarea
      id="message"
      rows={5}
      {...register("message")}
      placeholder="your message..."
      className="w-full bg-transparent border-0 border-b border-foreground/15 pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all duration-200 resize-none"
    />
    {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message.message}</p>}
  </div>

  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
  >
    {isSubmitting ? "Sending..." : (
      <>
        Send Message
        <Send className="h-4 w-4" />
      </>
    )}
  </button>
</form>
  )
}

