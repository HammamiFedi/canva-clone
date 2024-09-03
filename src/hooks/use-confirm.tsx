import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type UseConfirmProps = {
  title: string;
  message: string;
  type?: "desctructive" | "neutral";
};

export const useConfirm = ({
  title,
  message,
  type = "desctructive",
}: UseConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
  // State to control the mount/unmount of the confirmation dialog
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  // Function to trigger the confirmation dialog
  const confirm = () => new Promise((resolve) => setPromise({ resolve }));

  // Function to close the confirmation dialog
  const handleClose = () => {
    setPromise(null);
  };

  // Function to handle the confirm action
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  // Function to handle the cancel action
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  // Confirmation dialog component
  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant={type === "desctructive" ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
