"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Heart } from "lucide-react";
import { useState } from "react";

interface RSVPSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * RSVPSheet Component
 *
 * Bottom sheet that slides up showing RSVP form.
 * Submits data directly to Google Form.
 */
export default function RSVPSheet({ isOpen, onClose }: RSVPSheetProps) {
  const [formData, setFormData] = useState({
    nama: "",
    kehadiran: "",
    pax: "",
    ucapan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Google Form configuration - UPDATED WITH YOUR ACTUAL ENTRY IDs
  const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSeiexeIC3EX43ECxq7laNtgFpzLVVO43UfCJ6ULPsaRElAfQA/formResponse";
  const ENTRY_IDS = {
    nama: "entry.1348222147",
    kehadiran: "entry.1204336256",
    pax: "entry.1892659575",
    ucapan: "entry.702050704",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create form data for Google Form
      const formDataToSubmit = new FormData();
      formDataToSubmit.append(ENTRY_IDS.nama, formData.nama);
      formDataToSubmit.append(ENTRY_IDS.kehadiran, formData.kehadiran);
      formDataToSubmit.append(ENTRY_IDS.pax, formData.pax);
      formDataToSubmit.append(ENTRY_IDS.ucapan, formData.ucapan);

      // Submit to Google Form
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        body: formDataToSubmit,
        mode: "no-cors", // Required for Google Forms
      });

      // Success - Google Forms will always return opaque response with no-cors
      setSubmitStatus("success");

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          nama: "",
          kehadiran: "",
          pax: "",
          ucapan: "",
        });
        setSubmitStatus("idle");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // If kehadiran is set to HADIR and pax is empty, set it to 1
    if (name === "kehadiran" && value === "HADIR") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        pax: prev.pax || "1", // Set default to 1 if empty
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Animation variants
  const sheetVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="
              fixed
              inset-0
              bg-black/20
              backdrop-blur-[2px]
              z-40
            "
          />

          {/* RSVP Sheet */}
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed
              bottom-16
              sm:bottom-20
              left-0
              right-0
              z-50
              px-4
              pb-2
            "
          >
            <div
              className="
              max-w-2xl
              mx-auto
              bg-white
              rounded-t-3xl
              shadow-[0_-8px_30px_rgba(139,92,46,0.15)]
              border-t
              border-x
              border-amber-100/50
              overflow-hidden
            "
            >
              {/* Header */}
              <div
                className="
                flex
                items-center
                justify-between
                px-6
                py-4
                border-b
                border-amber-100/30
                bg-gradient-to-r
                from-amber-50/50
                to-cream-50
              "
              >
                <div className="flex items-center gap-2">
                  <Heart
                    className="w-5 h-5 text-amber-700"
                    fill="currentColor"
                  />
                  <h3 className="text-lg font-serif text-amber-900">RSVP</h3>
                </div>
                <button
                  onClick={onClose}
                  className="
                    p-2
                    rounded-full
                    hover:bg-amber-100/50
                    transition-colors
                    focus:outline-none
                    focus:ring-2
                    focus:ring-amber-300/50
                  "
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-amber-700" strokeWidth={2} />
                </button>
              </div>

              {/* Form Content */}
              <div
                className="
                max-h-[70vh]
                overflow-y-auto
                px-6
                py-6
              "
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nama */}
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-amber-900 mb-2"
                    >
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-amber-200/50
                        bg-amber-50/30
                        focus:bg-white
                        focus:border-amber-300
                        focus:ring-2
                        focus:ring-amber-200/50
                        outline-none
                        transition-all
                        text-amber-900
                        placeholder:text-amber-400
                      "
                      placeholder="Nama penuh anda"
                    />
                  </div>

                  {/* Kehadiran */}
                  <div>
                    <label
                      htmlFor="kehadiran"
                      className="block text-sm font-medium text-amber-900 mb-2"
                    >
                      Kehadiran <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="kehadiran"
                      name="kehadiran"
                      value={formData.kehadiran}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-amber-200/50
                        bg-amber-50/30
                        focus:bg-white
                        focus:border-amber-300
                        focus:ring-2
                        focus:ring-amber-200/50
                        outline-none
                        transition-all
                        text-amber-900
                      "
                    >
                      <option value="">Pilih kehadiran</option>
                      <option value="HADIR">Hadir</option>
                      <option value="TIDAK HADIR">Tidak Hadir</option>
                    </select>
                  </div>

                  {/* Pax (only show if attending) */}
                  {formData.kehadiran === "HADIR" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label
                        htmlFor="pax"
                        className="block text-sm font-medium text-amber-900 mb-2"
                      >
                        Bilangan Pax <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="pax"
                        name="pax"
                        value={formData.pax || "1"}
                        onChange={handleChange}
                        onKeyDown={(e) => e.preventDefault()}
                        required={formData.kehadiran === "HADIR"}
                        min="1"
                        className="
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-amber-200/50
        bg-amber-50/30
        focus:bg-white
        focus:border-amber-300
        focus:ring-2
        focus:ring-amber-200/50
        outline-none
        transition-all
        text-amber-900
        [appearance:textfield]
        [&::-webkit-outer-spin-button]:appearance-auto
        [&::-webkit-inner-spin-button]:appearance-auto
      "
                      />
                    </motion.div>
                  )}

                  {/* Ucapan */}
                  <div>
                    <label
                      htmlFor="ucapan"
                      className="block text-sm font-medium text-amber-900 mb-2"
                    >
                      Ucapan Kepada Pengantin
                    </label>
                    <textarea
                      id="ucapan"
                      name="ucapan"
                      value={formData.ucapan}
                      onChange={handleChange}
                      rows={4}
                      className="
                        w-full
                        px-4
                        py-3
                        rounded-xl
                        border
                        border-amber-200/50
                        bg-amber-50/30
                        focus:bg-white
                        focus:border-amber-300
                        focus:ring-2
                        focus:ring-amber-200/50
                        outline-none
                        transition-all
                        text-amber-900
                        placeholder:text-amber-400
                        resize-none
                      "
                      placeholder="Tulis ucapan anda di sini..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    whileTap={{ scale: 0.98 }}
                    className="
                      w-full
                      py-3.5
                      rounded-xl
                      bg-gradient-to-r
                      from-amber-600
                      to-amber-700
                      text-white
                      font-medium
                      shadow-lg
                      shadow-amber-500/25
                      hover:shadow-xl
                      hover:shadow-amber-500/30
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      transition-all
                      duration-200
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Menghantar...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <Heart className="w-5 h-5" fill="currentColor" />
                        Terima Kasih!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Hantar RSVP
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="
                        p-4
                        rounded-xl
                        bg-green-50
                        border
                        border-green-200
                        text-green-800
                        text-center
                        text-sm
                      "
                    >
                      RSVP anda telah berjaya dihantar! 🎉
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="
                        p-4
                        rounded-xl
                        bg-red-50
                        border
                        border-red-200
                        text-red-800
                        text-center
                        text-sm
                      "
                    >
                      Maaf, terdapat masalah. Sila cuba lagi.
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
