import { useEffect, useRef, useState, type FormEvent } from "react";
import { profile } from "../data/resume";
import { Button } from "./Button";
import { RecDot } from "./Hud";
import { Spinner } from "./Spinner";
import { useMagnetic } from "../hooks/useMagnetic";
import { useDismissOnOutsideOrEscape } from "../hooks/useDismissOnOutsideOrEscape";

const TRIGGER_MAGNETIC_OFFSET = 8;

type Status = "idle" | "sending" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const FALLBACK_ERROR = `Couldn't send that — email me directly at ${profile.email} instead.`;

export function ContactModal({
  isOpen: controlledIsOpen,
  onOpenChange,
}: {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState(FALLBACK_ERROR);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerMagneticRef = useMagnetic<HTMLButtonElement>(true, TRIGGER_MAGNETIC_OFFSET);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    firstFieldRef.current?.focus();
  }, [isOpen]);

  useDismissOnOutsideOrEscape(isOpen, [panelRef, triggerRef], () => setIsOpen(false));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMessage(
        `This form isn't wired up yet — email me directly at ${profile.email} instead.`,
      );
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `Portfolio message from ${data.get("name")}`);

    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(FALLBACK_ERROR);
      }
    } catch {
      setStatus("error");
      setErrorMessage(FALLBACK_ERROR);
    }
  }

  return (
    <>
      <button
        ref={(node) => {
          triggerRef.current = node;
          triggerMagneticRef.current = node;
        }}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close contact form" : "Send a message"}
        aria-expanded={isOpen}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-ink text-paper shadow-lg transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:bottom-8 sm:left-8 cursor-pointer"
      >
        {isOpen ? (
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2 2 L14 14 M14 2 L2 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 5c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v7.5c0 .83-.67 1.5-1.5 1.5H7.5l-3.8 3.2v-3.2H4c-.83 0-1.5-.67-1.5-1.5V5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Contact form"
          className="fixed bottom-[5.5rem] left-6 z-40 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-md border border-ink/15 bg-paper shadow-xl sm:bottom-24 sm:left-8"
        >
          <div className="flex items-center justify-between border-b border-ink/10 bg-ink px-4 py-3">
            <RecDot tone="dark" />
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-paper/70">
              Contact
            </span>
          </div>

          <div className="flex flex-col gap-3 px-4 pt-4">
            <p className="max-w-[85%] rounded-md rounded-tl-none bg-ink/5 px-3 py-2 font-body text-body text-ink">
              Hey, I'm {profile.name.split(" ")[0]} — leave a message and I'll
              get back to you.
            </p>
          </div>

          {status === "success" ? (
            <div className="flex flex-col gap-3 p-4">
              <p className="ml-auto max-w-[85%] rounded-md rounded-tr-none bg-orange-deep px-3 py-2 font-body text-body text-paper">
                Message sent — thanks! I'll reply by email soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3 p-4"
            >
              <label className="flex flex-col gap-1">
                <span className="font-hud text-tag uppercase tracking-[0.06em] text-ash-deep">
                  Name
                </span>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="name"
                  required
                  className="rounded-sm border border-ink/20 bg-paper px-3 py-2 font-body text-body text-ink outline-none focus:border-orange-deep"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-hud text-tag uppercase tracking-[0.06em] text-ash-deep">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-sm border border-ink/20 bg-paper px-3 py-2 font-body text-body text-ink outline-none focus:border-orange-deep"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-hud text-tag uppercase tracking-[0.06em] text-ash-deep">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={3}
                  className="resize-none rounded-sm border border-ink/20 bg-paper px-3 py-2 font-body text-body text-ink outline-none focus:border-orange-deep"
                />
              </label>

              {status === "error" && (
                <p role="alert" className="font-hud text-tag text-orange-deep">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                magnetic
                disabled={status === "sending"}
                className="mt-1"
              >
                {status === "sending" ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
