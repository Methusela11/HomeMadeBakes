import { useState } from "react";
import whatsappIcon from "../assets/images/icons/whatsapp.png";
import closeIcon from "../assets/images/icons/close.png";
import agentLogo from "../assets/images/logo/RB.png";

export default function Whatsapp() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* FLOATING ICON */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-[9999] shadow-lg"
      >
        <img
          src={isOpen ? closeIcon : whatsappIcon}
          alt="WhatsApp"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CHAT BOX */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[340px] bg-white rounded-xl shadow-2xl z-[9999] font-sans overflow-hidden">
          {/* HEADER */}
          <div className="bg-orange-100 text-black p-4">
            <div className="flex items-center gap-2">
              <img src={whatsappIcon} alt="icon" className="w-6 h-6" />
              <h4 className="font-semibold text-base">Start a Conversation</h4>
            </div>
            <p className="text-sm mt-2 opacity-90">
              Hi! Click below to chat with us on WhatsApp
            </p>
          </div>

          {/* BODY */}
          <div className="p-4">
            <small className="text-gray-500 text-xs block mb-3">
              The team typically replies in a few minutes.
            </small>

            <a
              href="https://wa.me/254762120373"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg hover:bg-orange-200 transition"
            >
              <img
                src={agentLogo}
                alt="agent"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <strong className="block text-sm">Sales Agent Support</strong>
                <span className="text-xs text-gray-600">
                  Need Help? Chat with us
                </span>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
