// app/dashboard/profile/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your RaahYab profile.",
};

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-5">
        <p className="text-sm text-muted-foreground">Account</p>
        <h1 className="text-2xl font-medium text-foreground">Profile</h1>
      </div>
      <p className="text-sm text-muted-foreground">Profile settings go here.</p>
    </div>
  );
}