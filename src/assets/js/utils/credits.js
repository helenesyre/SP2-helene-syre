import { useAuth } from '../utils/useAuth.js';
import { getSingleProfileData } from '../utils/fetch.js';
import { showToast } from '../components/toasts/toast.js';

export async function getUserCredits() {
  const { getUserData } = useAuth();
  const user = getUserData();

  try {
    const profileData = await getSingleProfileData(user.name);
    return profileData?.data?.credits || 0;
  } catch (error) {
    showToast('Error fetching user credits. Please try again later.', 'error');
    return 0; // Return 0 credits if there's an error
  }
}
