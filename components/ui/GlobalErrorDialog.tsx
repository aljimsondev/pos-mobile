import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogProps,
  AlertDialogTitle,
} from '@/components/reusable/alert-dialog';
import { Text } from '@/components/reusable/text';
import { useErrorStore } from '@/lib/store/error-store';

export function GlobalErrorDialog({ ...rest }: AlertDialogProps & {}) {
  const {
    isOpen,
    title,
    description,
    onCancel,
    onContinue,
    cancelText,
    continueText,
    continueAction,
    hideError,
  } = useErrorStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={hideError}>
      <AlertDialogContent className="min-w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onPress={onCancel}>
            <Text>{cancelText}</Text>
          </AlertDialogCancel>
          {continueAction && (
            <AlertDialogAction onPress={onContinue}>
              <Text>{continueText}</Text>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
