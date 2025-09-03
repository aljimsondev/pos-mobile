// stores/dialog-store.js
import { ReactNode } from 'react';
import { create } from 'zustand';

interface DialogState {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel?: () => void;
  onContinue?: () => void;
  cancelText?: string;
  continueText?: string;
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  showCancel?: boolean;
  showContinue?: boolean;
  content?: ReactNode;
}

interface DialogStore extends DialogState {
  showDialog: (dialog: Partial<DialogState>) => void;
  hideDialog: () => void;
  reset: () => void;
}

const initialState: DialogState = {
  isOpen: false,
  title: 'Dialog',
  description: 'Please choose an action.',
  onCancel: undefined,
  onContinue: undefined,
  cancelText: 'Cancel',
  continueText: 'Continue',
  variant: 'default',
  showCancel: true,
  showContinue: true,
  content: null,
};

export const useDialogStore = create<DialogStore>((set, get) => ({
  ...initialState,

  showDialog: (dialog) => {
    set({
      isOpen: true,
      title: dialog.title || initialState.title,
      description: dialog.description || initialState.description,
      onCancel: dialog.onCancel,
      onContinue: dialog.onContinue,
      cancelText: dialog.cancelText || initialState.cancelText,
      continueText: dialog.continueText || initialState.continueText,
      variant: dialog.variant || initialState.variant,
      showCancel:
        dialog.showCancel !== undefined
          ? dialog.showCancel
          : initialState.showCancel,
      showContinue:
        dialog.showContinue !== undefined
          ? dialog.showContinue
          : initialState.showContinue,
    });
  },

  hideDialog: () => {
    set({ isOpen: false });
  },

  reset: () => {
    set(initialState);
  },
}));

// Helper functions for common dialog scenarios
export const dialogHelpers = {
  showError: (title?: string, description?: string, onRetry?: () => void) => {
    useDialogStore.getState().showDialog({
      title: title || 'Error',
      description: description || 'Something went wrong. Please try again.',
      variant: 'destructive',
      continueText: onRetry ? 'Retry' : 'OK',
      showCancel: !!onRetry,
      onContinue: onRetry,
    });
  },

  showConfirmation: (
    title: string,
    description: string,
    onConfirm: () => void,
  ) => {
    useDialogStore.getState().showDialog({
      title,
      description,
      variant: 'warning',
      cancelText: 'Cancel',
      continueText: 'Confirm',
      onContinue: onConfirm,
    });
  },

  showSuccess: (title?: string, description?: string) => {
    useDialogStore.getState().showDialog({
      title: title || 'Success',
      description: description || 'Operation completed successfully.',
      variant: 'success',
      cancelText: 'Close',
      showContinue: false,
    });
  },

  showInfo: (title: string, description: string) => {
    useDialogStore.getState().showDialog({
      title,
      description,
      variant: 'default',
      cancelText: 'OK',
      showContinue: false,
    });
  },

  showDeleteConfirmation: (itemName: string, onDelete: () => void) => {
    useDialogStore.getState().showDialog({
      title: 'Delete Confirmation',
      description: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      variant: 'destructive',
      cancelText: 'Cancel',
      continueText: 'Delete',
      onContinue: onDelete,
    });
  },
};
