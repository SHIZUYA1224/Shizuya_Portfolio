interface ButtonProps {
  href: string;
  text: string;
}

export default function Button({ href, text }: ButtonProps) {
  return (
    <a
      href={href}
      className="
        group relative inline-block px-8 py-3 
        font-bold text-slate-800 
        bg-white border-2 border-slate-800 rounded-lg
        overflow-hidden transition-colors duration-300
        hover:text-white
        shadow-[4px_4px_0px_0px_rgba(30,41,59,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
      "
    >
      {/* ホバー時に流れてくる背景色 */}
      <span className="absolute inset-0 w-full h-full bg-slate-800 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
      
      <span className="relative">{text}</span>
    </a>
  );
}

