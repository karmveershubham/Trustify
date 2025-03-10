import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="border border-gray-100 rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
        <h3 className="font-medium text-gray-900">{question}</h3>
        <span className="faq-icon transition-transform duration-300">
          <PlusIcon className="h-5 w-5 text-gray-400 open:hidden" />
          <MinusIcon className="h-5 w-5 text-gray-400 hidden open:inline-block" />
        </span>
      </summary>

      <div className="p-4 pt-2 pb-2 text-gray-600 border-t border-gray-100 animate-fadeIn">
        <p>{answer}</p>
      </div>
    </details>
  );
}
