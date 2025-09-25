import { Unit } from '@/constants/unit-of-measurement';
import { create } from 'zustand';

interface MeasurementState {
  selectedMeasurement: Unit | null;
}

interface UnitOfMeasurementStore extends MeasurementState {
  setSelectedMeasurement: (unit: Unit) => void;
  unsetSelectedMeasurement: () => void;
}

const initialState: MeasurementState = {
  selectedMeasurement: null,
};

export const useUnitMeasurementStore = create<UnitOfMeasurementStore>(
  (set, get) => ({
    ...initialState,
    setSelectedMeasurement: (unit: Unit) => {
      if (!unit) return;
      set({
        selectedMeasurement: unit,
      });
    },

    unsetSelectedMeasurement: () => {
      set({
        selectedMeasurement: null,
      });
    },
  }),
);
