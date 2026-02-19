interface SearchInputProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

export default function SearchInput({ city, setCity, onSearch }: SearchInputProps) {
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch();
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
      <input
        type="text"
        placeholder="Skriv stad här..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 text-base sm:text-lg p-4 sm:p-5 rounded-3xl border-2 border-sky-300 bg-white text-slate-800 placeholder:text-slate-400
                   focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-300"
      />

      <button
        onClick={onSearch}
        className="text-base sm:text-lg font-extrabold px-7 py-4 sm:py-5 rounded-3xl bg-rose-500 text-white shadow-md
                   hover:bg-rose-600 active:scale-[0.99] transition"
      >
        SÖK 🔍
      </button>
    </div>
  );
}
