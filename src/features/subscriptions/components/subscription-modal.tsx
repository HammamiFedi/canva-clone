"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useCheckout } from "@/features/subscriptions/api/use-checkout";

export const SubscriptionModal = () => {
  const { isOpen, onClose } = useSubscriptionModal();

  const { mutate, isPending } = useCheckout();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <DialogTitle className="text-center">
            Upgrade to a paid plan
          </DialogTitle>
          <DialogDescription>
            Upgrade to a paid plan to unlock more features.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited projects</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Unlimited templates</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">AI Image generation</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 size-5 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              AI Background removal
            </p>
          </li>
        </ul>
        <DialogFooter className="mt-4 space-y-2 pt-2">
          <Button
            className="w-full"
            onClick={() => mutate()}
            disabled={isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
