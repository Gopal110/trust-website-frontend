'use client';

import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '9719415506'; // Actual number from user
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello, I want to learn more about Shri Shivcharan Trust.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition duration-300 transform hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.018.265 2.012.766 2.887l-.814 2.972 3.039-.797c.844.46 1.792.703 2.76.703 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.751-5.767zm3.1 8.2l-.125.125a.3.3 0 01-.429 0l-1.071-1.071a.3.3 0 010-.429l.113-.113.129-.129.214-.214a.2.2 0 000-.284l-.536-.536a.2.2 0 00-.284 0l-.107.107-.121.121-.214.214-.043.043a1.536 1.536 0 01-1.842-.043 1.536 1.536 0 01-.043-1.842l.043-.043.214-.214.121-.121.107-.107a.2.2 0 000-.284l-.536-.536a.2.2 0 00-.284 0l-.214.214-.129.129-.113.113a.3.3 0 01-.429 0l-1.071-1.071a.3.3 0 010-.429l.125-.125a.2.2 0 000-.284l-.536-.536a.2.2 0 00-.284 0l-.214.214a.2.2 0 000 .284l.536.536a.2.2 0 00.284 0l.129-.129.113-.113a.3.3 0 01.429 0l1.071 1.071a.3.3 0 010 .429l-.125.125a.2.2 0 000 .284l.536.536a.2.2 0 00.284 0l.214-.214a.2.2 0 000-.284l-.536-.536a.2.2 0 00-.284 0z" />
        <path d="M12.031 2c-5.523 0-10 4.477-10 10 0 1.765.459 3.42 1.257 4.856L2 22l5.314-1.393A9.957 9.957 0 0012.031 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zM12.031 20c-1.664 0-3.22-.445-4.562-1.22l-.328-.19-3.397.891.906-3.312-.208-.344A7.957 7.957 0 014.031 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
