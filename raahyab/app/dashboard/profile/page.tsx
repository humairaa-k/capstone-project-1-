import { auth } from "@/lib/auth";
import { DeleteAccountButton } from "@/components/dashboard/profile/DeleteAccountButton";

export default async function ProfilePage() {
  const session = await auth();
  const user = session!.user;

  const initial = (user.username ?? user.name ?? user.email)?.[0]?.toUpperCase() ?? "U";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Account
      </p>
      <h1 className="mb-10 text-3xl font-bold text-foreground">Your Profile</h1>

      <div className="mb-8 flex items-center gap-6 rounded-3xl bg-card p-8 shadow-sm">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#5EEAD4,#0F766E)] text-3xl font-semibold text-white">
          {initial}
        </div>
        <div>
          <p className="mb-1 text-xl font-bold text-foreground">
            {user.name ?? user.username}
          </p>

          <p className="mb-2.5 text-sm text-muted-foreground">{user.email}</p>
          
          <span className="inline-flex rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-accent-hover">
            {user.role === "admin" ? "Admin" : "User"}
          </span>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-3xl bg-card shadow-sm">
        {[
          { label: "Username", value: user.username ?? "—" },
          { label: "Email", value: user.email },
          ...(memberSince ? [{ label: "Member since", value: memberSince }] : []),
        ].map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-8 py-5 ${
              i > 0 ? "border-t border-surface" : ""
            }`}
          >
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className="text-[15px] font-medium text-foreground">{row.value}</span>
          </div>
        ))}
      </div>

      {user.role === "admin" ? (
        <div className="rounded-3xl border border-foreground/10 bg-card p-7">
          <p className="mb-1.5 text-sm font-semibold text-foreground">Admin Account</p>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Admin accounts can&apos;t be deleted from this page. Contact another admin or manage
            this from the database directly if needed.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-7">
          <p className="mb-1.5 text-sm font-bold text-red-800">Danger Zone</p>
          <p className="mb-5 max-w-md text-sm leading-relaxed text-red-700/85">
            Deleting your account is permanent and cannot be undone. All your saved opportunities
            and data will be removed.
          </p>
          <DeleteAccountButton />
        </div>
      )}
    </main>
  );
}
