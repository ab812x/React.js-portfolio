// src/hooks/useScrollTo.js
const useScrollTo = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    // 80px offset accounts for fixed header height
    window.scrollTo({ top, behavior: "smooth" });
    // Do NOT push to history — no hash in URL
  };
  return scrollTo;
};

export default useScrollTo;
