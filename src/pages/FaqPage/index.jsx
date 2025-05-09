import React, { useState } from 'react';

const faqs = [
  {
    question: 'How can I track my order?',
    answer: 'You can track your order from your account dashboard under the "My Orders" section. You’ll also receive email updates at each stage.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on most items. Products must be unused and in original packaging. Please visit our Return Policy page for more info.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 50 countries. International shipping charges apply and delivery times vary by destination.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer: 'Orders can be changed or canceled within 1 hour of placing them. Contact our support team immediately if you need assistance.',
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onClick}
      className="w-full text-left py-4 px-4 flex justify-between items-center focus:outline-none hover:bg-pink-50 transition-colors"
    >
      <span className="font-medium text-gray-800">{faq.question}</span>
      <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        ▼
      </span>
    </button>
    {isOpen && (
      <div className="px-4 pb-4 text-gray-600 transition">
        {faq.answer}
      </div>
    )}
  </div>
);

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-8">Frequently Asked Questions</h2>
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
