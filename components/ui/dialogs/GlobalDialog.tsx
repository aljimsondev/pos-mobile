// components/global-dialog.jsx
import { Button } from '@/components/reusable/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/reusable/dialog';
import { Separator } from '@/components/reusable/separator';
import { Text } from '@/components/reusable/text';
import IconButton from '@/components/ui/IconButton';
import { useDialogStore } from '@/lib/store/dialog-store';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

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
    <Dialog open={isOpen}>
      <DialogContent
        className={`min-w-full ${getVariantClasses()}`}
        hideCloseButton
      >
        <DialogHeader>
          <IconButton
            className="absolute -right-3 -top-3 border-transparent rounded-full"
            icon={(color) => <Ionicons name="close" size={24} color={color} />}
            onPress={handleCancel}
          />
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pt-2 pb-4">
            {description}
          </DialogDescription>
        </DialogHeader>
        <View>
          <Separator />
        </View>
        <DialogFooter className="flex-row justify-between">
          {showCancel && (
            <Button onPress={handleCancel} variant="outline">
              <Text>{cancelText}</Text>
            </Button>
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
