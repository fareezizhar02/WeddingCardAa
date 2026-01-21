'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';

interface Contact {
  name: string;
  role: string;
  phone: string;
}

interface ContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ContactSheet Component
 * 
 * Bottom sheet that slides up above the app bar showing contact information.
 * Displays name, role, and action buttons (call & WhatsApp).
 */
export default function ContactSheet({ isOpen, onClose }: ContactSheetProps) {
  // Contact list - customize as needed
  const contacts: Contact[] = [
    {
      name: 'En Fadzil',
      role: 'Ayah',
      phone: '+60132080145',
    },
    {
      name: 'Pn Rahayuwati',
      role: 'Ibu',
      phone: '+60132080146',
    },
  ];

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    // Remove '+' and format for WhatsApp
    const whatsappNumber = phone.replace(/\+/g, '');
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  // Animation variants
  const sheetVariants = {
    hidden: { 
      y: '100%',
      opacity: 0,
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: { 
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
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

          {/* Contact Sheet */}
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
            <div className="
              max-w-2xl
              mx-auto
              bg-white
              rounded-t-3xl
              shadow-[0_-8px_30px_rgba(139,92,46,0.15)]
              border-t
              border-x
              border-amber-100/50
              overflow-hidden
            ">
              {/* Header */}
              <div className="
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
              ">
                <h3 className="text-lg font-serif text-amber-900">
                  Hubungi Kami
                </h3>
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

              {/* Contact List */}
              <div className="
                max-h-[60vh]
                overflow-y-auto
                divide-y
                divide-amber-100/30
              ">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      justify-between
                      px-6
                      py-5
                      hover:bg-amber-50/30
                      transition-colors
                      duration-200
                    "
                  >
                    {/* Contact Info */}
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-amber-900">
                        {contact.name}
                      </h4>
                      <p className="text-sm text-amber-700/60 mt-0.5">
                        {contact.role}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Call Button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleCall(contact.phone)}
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-gradient-to-br
                          from-green-50
                          to-green-100
                          flex
                          items-center
                          justify-center
                          shadow-sm
                          hover:shadow-md
                          transition-shadow
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-300/50
                          focus:ring-offset-2
                        "
                        aria-label={`Call ${contact.name}`}
                      >
                        <Phone className="w-5 h-5 text-green-700" strokeWidth={2} />
                      </motion.button>

                      {/* WhatsApp Button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleWhatsApp(contact.phone)}
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-gradient-to-br
                          from-emerald-50
                          to-emerald-100
                          flex
                          items-center
                          justify-center
                          shadow-sm
                          hover:shadow-md
                          transition-shadow
                          focus:outline-none
                          focus:ring-2
                          focus:ring-emerald-300/50
                          focus:ring-offset-2
                        "
                        aria-label={`WhatsApp ${contact.name}`}
                      >
                        <MessageCircle className="w-5 h-5 text-emerald-700" strokeWidth={2} />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}