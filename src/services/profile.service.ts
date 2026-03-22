import { MOCK_USER_PROFILE } from "@/data/mock";
import type { UserProfile } from "@/types/transit";

export async function getUserProfile(): Promise<UserProfile> {
  return Promise.resolve(MOCK_USER_PROFILE);
}
