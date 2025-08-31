// components/global-dialog.jsx
import { Button } from '@/components/reusable/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/reusable/dialog';
import { Text } from '@/components/reusable/text';
import { useDialogStore } from '@/lib/store/dialog-store';

export function GlobalDialog() {
  const {
    isOpen,
    title,
    description,
    onCancel,
    onContinue,
    cancelText,
    continueText,
    variant,
    showCancel,
    showContinue,
    hideDialog,
  } = useDialogStore();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    hideDialog();
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    hideDialog();
  };

  // Get variant-specific styling classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'destructive':
        return 'text-destructive border-destructive/20';
      case 'warning':
        return 'text-amber-600 border-amber-200';
      case 'success':
        return 'text-green-600 border-green-200';
      default:
        return '';
    }
  };

  const getContinueVariant = () => {
    switch (variant) {
      case 'destructive':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'success':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={hideDialog}>
      <DialogContent className={`min-w-full ${getVariantClasses()}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {showCancel && (
            <DialogClose onPress={handleCancel}>
              <Text>{cancelText}</Text>
            </DialogClose>
          )}
          {showContinue && (
            <Button onPress={handleContinue} variant={getContinueVariant()}>
              <Text>{continueText}</Text>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
