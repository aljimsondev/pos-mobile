// stores/error-store.js
import { create } from 'zustand';

interface ErrorState {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel?: () => void;
  onContinue?: () => void;
  cancelText?: string;
  continueText?: string;
  continueAction?: boolean;
}

interface ErrorStore extends ErrorState {
  showError: (error: Partial<ErrorState>) => void;
  hideError: () => void;
  reset: () => void;
}

const initialState: ErrorState = {
  isOpen: false,
  title: 'Error',
  description: 'Something went wrong. Please try again.',
  onCancel: undefined,
  onContinue: undefined,
  cancelText: 'Cancel',
  continueText: 'Continue',
  continueAction: undefined,
};

export const useErrorStore = create<ErrorStore>((set, get) => ({
  ...initialState,

  showError: (error) => {
    set({
      isOpen: true,
      title: error.title || initialState.title,
      description: error.description || initialState.description,
      onCancel: error.onCancel,
      onContinue: error.onContinue,
      cancelText: error.cancelText || initialState.cancelText,
      continueText: error.continueText || initialState.continueText,
      continueAction: error.continueAction,
    });
  },

  hideError: () => {
    set({ isOpen: false });
  },

  reset: () => {
    set(initialState);
  },
}));

// Helper functions for common error scenarios
export const errorHelpers = {
  showNetworkError: () => {
    useErrorStore.getState().showError({
      title: 'Network Error',
      description:
        'Unable to connect to the server. Please check your internet connection and try again.',
    });
  },

  showValidationError: (message?: string) => {
    useErrorStore.getState().showError({
      title: 'Validation Error',
      description: message || 'Please check your input and try again.',
    });
  },

  showUnauthorizedError: () => {
    useErrorStore.getState().showError({
      title: 'Access Denied',
      description:
        'You are not authorized to perform this action. Please log in and try again.',
    });
  },

  showGenericError: (message?: string) => {
    useErrorStore.getState().showError({
      title: 'Error',
      description: message || 'Something went wrong. Please try again.',
    });
  },
};
