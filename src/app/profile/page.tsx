import { getUserProfile } from "@/services/profile.service";
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata = {
  title: "Profile - TransitPulse",
  description: "Your transit preferences and saved routes",
};

export default async function ProfilePage() {
  const profile = await getUserProfile();
  return <ProfileClient profile={profile} />;
}
