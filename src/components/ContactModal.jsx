import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const ContactModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(() => {
        setSubmitStatus("success");
        formRef.current.reset();
        setTimeout(() => onClose(), 2000);
      })
      .catch(() => setSubmitStatus("error"))
      .finally(() => setIsSending(false));
  };

  const handleClose = () => {
    setSubmitStatus(null);
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Render into document.body via portal — escapes header stacking context
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-300">Get In Touch</h2>
              <button
                onClick={handleClose}
                data-cursor="button"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="How can I help you?"
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-green-400 text-sm text-center">
                  ✅ Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm text-center">
                  ❌ Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.03 }}
                whileTap={{ scale: isSending ? 1 : 0.97 }}
                data-cursor="button"
                className="w-full px-4 py-2 bg-linear-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50 disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-white"
              >
                {isSending ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ContactModal;
