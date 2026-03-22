import { MOCK_USER_PROFILE } from "@/data/mock";
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata = {
  title: "Profile - TransitPulse",
  description: "Your transit preferences and saved routes",
};

export default function ProfilePage() {
  const profile = MOCK_USER_PROFILE;
  return <ProfileClient profile={profile} />;
}
