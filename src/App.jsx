import { useState } from "react";
import arrow from "./assets/images/icon-arrow.svg";

function App() {
  const [age, setAge] = useState({ year: "- -", month: "- -", day: "- -" });
  const [inputs, setInputs] = useState({ day: "", month: "", year: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { day, month, year } = inputs;
    if (!day || !month || !year) return;

    const today = new Date();
    // Birth date: Month is 0-indexed in JS (January is 0)
    const birthDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({ year: years, month: months, day: days });
  };

  const handleInputChange = (e, field) => {
    setInputs({ ...inputs, [field]: e.target.value });
    setSubmitted(false); // Reset error state while typing
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[90%] max-w-[600px] bg-white rounded-xl rounded-br-[100px] md:rounded-br-[150px] p-6 py-10 shadow-sm">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex md:justify-start justify-between gap-4 md:gap-8 mb-12 mr-6">
            {[
              { label: "DAY", id: "day", placeholder: "DD" },
              { label: "MONTH", id: "month", placeholder: "MM" },
              { label: "YEAR", id: "year", placeholder: "YYYY" },
            ].map((item) => (
              <div key={item.id} className="flex flex-col w-24 md:w-32">
                <label
                  className={`text-xs font-bold tracking-widest mb-2 ${submitted && !inputs[item.id] ? "text-red-500" : "text-gray-500"}`}
                >
                  {item.label}
                </label>
                <input
                  type="text"
                  placeholder={item.placeholder}
                  value={inputs[item.id]}
                  onChange={(e) => handleInputChange(e, item.id)}
                  className={`border rounded-lg p-3 text-xl font-bold w-30 focus:outline-none focus:border-purple-500 caret-purple-500
                    ${submitted && !inputs[item.id] ? "border-red-500" : "border-gray-200"}`}
                  required
                />
                {submitted && !inputs[item.id] && (
                  <p className="text-red-500 italic text-[10px] mt-1 font-medium">
                    This field is required
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="relative flex items-center mb-8 ">
            <hr className="w-full border-gray-200" />
            <button
              type="submit"
              className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 hover:bg-black transition-colors"
            >
              <img src={arrow} alt="Arrow icon" className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-5xl md:text-7xl font-extrabold italic">
              <span className="text-purple-500">{age.year}</span> years
            </div>
            <div className="text-5xl md:text-7xl font-extrabold italic">
              <span className="text-purple-500">{age.month}</span> months
            </div>
            <div className="text-5xl md:text-7xl font-extrabold italic">
              <span className="text-purple-500">{age.day}</span> days
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
