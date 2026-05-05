import { useAuth } from '../utils/useAuth.js';
import { getSingleProfileData } from '../utils/fetch.js';
import { showToast } from '../components/toasts/toast.js';

export async function getUserCredits() {
  const { getUserData, isLoggedIn } = useAuth();
  if (!isLoggedIn()) return 0;

  try {
    const profileData = await getSingleProfileData(getUserData().name);
    return profileData?.data?.credits || 0;
  } catch (error) {
    showToast('Error fetching user credits. Please try again later.', 'error');
    return 0;
  }
}
