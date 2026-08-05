import { Link } from "react-router-dom";
import { RecDot } from "../components/Hud";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ink px-6 py-16 text-paper sm:px-14">
      <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col gap-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-hud text-tag uppercase tracking-[0.08em] text-ash transition-colors hover:text-orange"
          >
            <span aria-hidden="true">←</span> Back
          </Link>
          <div className="flex items-center gap-4">
            <RecDot />
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-ash">
              Viewfinder / Not Found
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <img
            src="/assets/404.svg"
            alt=""
            aria-hidden="true"
            className="w-full max-w-2xl"
          />
          <h1 className="font-hud text-hud uppercase tracking-[0.08em] text-ash">
            Page not found — the link's dead, not the developer
          </h1>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border-2 border-paper px-6 py-3 font-hud font-medium text-tag uppercase tracking-[0.06em] text-paper transition-colors hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
