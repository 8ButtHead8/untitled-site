import { TELEGRAM_URL, TELEGRAM_HANDLE } from "@/data/constants";

export default function Footer() {
  return (
    <footer className="footer-bar bg-dark px-[52px] py-14">
      <div className="max-w-[1080px] mx-auto flex items-center justify-between flex-wrap gap-4">
        <p className="text-[13px] text-white/30">
          © 2026 · Светлана Жукова · Профориентолог · Онлайн по всей России
        </p>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/40 no-underline"
        >
          Telegram {TELEGRAM_HANDLE}
        </a>
      </div>
    </footer>
  );
}
