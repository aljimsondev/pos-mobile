import {
  type SheetName,
  useBottomSheetStore,
} from '@/lib/store/bottom-sheet.store';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

/**
 * A custom React hook that handles hardware back button presses for bottom sheets.
 *
 * This hook automatically closes the specified bottom sheet when the user presses
 * the hardware back button (Android) and the sheet is currently open. It uses
 * `useFocusEffect` to ensure the back handler is only active when the screen
 * is in focus, preventing conflicts with other screens.
 *
 * @param sheetName - The name/identifier of the bottom sheet to control
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   // Automatically handle back button for 'measurement' sheet
 *   useSheetBackHandler('measurement');
 *
 *   return (
 *     <MeasurementSheet />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function ProductSheet() {
 *   // Handle back button for 'product' sheet
 *   useSheetBackHandler('product');
 *
 *   return (
 *     <BottomSheetModal>
 *       // Sheet content
 *     </BottomSheetModal>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Only works on Android devices with hardware back buttons
 * - Automatically prevents default back navigation when sheet is open
 * - Cleans up event listeners when component unmounts or loses focus
 * - Uses the bottom sheet store to check open state and trigger close action
 *
 * @since 1.0.0
 */
function useSheetBackHandler(sheetName: SheetName) {
  const sheet = useBottomSheetStore();
  const isOpen = sheet[sheetName];

  // Handle back button press
  useFocusEffect(
    useCallback(() => {
      /**
       * Handles the hardware back button press event
       * @returns {boolean} True to prevent default back action, false to allow it
       */
      const onBackPress = () => {
        if (isOpen) {
          sheet.close(sheetName);
          return true; // Prevent default back action
        }
        return false; // Let default back action happen
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [isOpen, sheet, sheetName]),
  );
}

export default useSheetBackHandler;
