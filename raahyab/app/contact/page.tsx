import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-start">

        {/* Left column  heading */}
        <div className="lg:sticky lg:top-32">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Get in Touch
          </p>
          <h1
            style={{ fontFamily: "var(--font-dm-serif)" }}
            className="text-4xl sm:text-7xl italic text-foreground leading-tight mb-6"
          >
            Contact Us
          </h1>
          <p className="text-sm text-muted-foreground italic leading-7 max-w-sm">
            Have a question or suggestion? We'd love to hear from you — fill out the form and we'll get back to you soon.
          </p>
        </div>

        {/* Right column form */}
        <div className="pt-12">
          <ContactForm />
        </div>

      </div>
    </div>
  );
}