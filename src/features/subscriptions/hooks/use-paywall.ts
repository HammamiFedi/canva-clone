import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";

export const usePaywall = () => {
  const { onOpen } = useSubscriptionModal();

  // Mock paywall
  const shouldBlock = true; // TODO: Fetch from API

  return {
    isLoading: false, // TODO fetch from React Query
    shouldBlock,
    triggerPaywall: onOpen,
  };
};
