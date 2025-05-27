type InputNumberProps = {
  timeSeconds: number;
  onChange: (newValue: number) => void;
};

function InputNumber({ timeSeconds, onChange }: InputNumberProps) {
  return (
    <div className="relative flex max-w-[8rem] items-center">
      <button
        type="button"
        aria-describedby=""
        className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:ring-2 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        onClick={() => onChange(-1 * 1000)} // dec button should decrese
      >
        <svg
          className="h-3 w-3 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={"999"}
        maxLength={3}
        value={timeSeconds / 1000}
        onChange={(e) => onChange(Number(e.target.value) * 1000)} // change to current value in input field
      />
      <button
        type="button"
        className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:ring-2 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        onClick={() => onChange(timeSeconds + 1 * 1000)}
      >
        <svg
          className="h-3 w-3 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default InputNumber;
