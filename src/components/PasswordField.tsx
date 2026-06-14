import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = Omit<React.ComponentProps<"input">, "type"> & {
  label: string;
};

export function PasswordField({ label, className = "", ...props }: PasswordFieldProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          {...props}
          id={id}
          type={visible ? "text" : "password"}
          className={`w-full rounded-2xl border border-border bg-white/80 px-4 py-3 pr-12 text-sm outline-none focus:border-rose-vif focus:ring-2 focus:ring-rose-vif/20 ${className}`}
        />
        <button
          type="button"
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}