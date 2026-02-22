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
    <>
      <input
        type="text"
        placeholder="Skriv stad här..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full text-base sm:text-lg p-4 sm:p-5 rounded-3xl border-2 border-[#9dd5ff] bg-[#ffffff] text-[#1e293b] placeholder:text-[#94a3b8]
                   focus:outline-none focus:ring-4 focus:ring-[#d4f0c8] focus:border-[#82bc39]"
      />

      <button
        onClick={onSearch}
        className="w-full sm:w-auto text-base sm:text-lg mt-4 font-extrabold px-7 py-4 sm:py-5 rounded-3xl bg-[#dd3957] text-[#ffffff] shadow-md
                   hover:bg-[#cc1622] active:scale-[0.99] transition"
      >
        SÖK 🔍
      </button>
    </>
  );
}
