type Unit = {
  code: string;
  name: string;
  symbol: string;
  system: string;
};

type UnitWithCategory = Unit & {
  category: string;
};

// POS System Units of Measurement - Key-Value Pair Format
const unit_of_measurement = {
  // Weight/Mass Units
  weight: [
    // Metric System
    { code: 'mg', name: 'Milligram', symbol: 'mg', system: 'metric' },
    { code: 'g', name: 'Gram', symbol: 'g', system: 'metric' },
    { code: 'kg', name: 'Kilogram', symbol: 'kg', system: 'metric' },
    { code: 'mt', name: 'Metric Ton', symbol: 't', system: 'metric' },

    // Imperial/US System
    { code: 'oz', name: 'Ounce', symbol: 'oz', system: 'imperial' },
    { code: 'lb', name: 'Pound', symbol: 'lb', system: 'imperial' },
    { code: 'st', name: 'Stone', symbol: 'st', system: 'imperial' },
    { code: 'ton', name: 'Ton (US)', symbol: 'ton', system: 'imperial' },

    // Precious Metals
    { code: 'dwt', name: 'Pennyweight', symbol: 'dwt', system: 'troy' },
    { code: 'ozt', name: 'Troy Ounce', symbol: 'oz t', system: 'troy' },
    { code: 'toz', name: 'Troy Ounce', symbol: 'toz', system: 'troy' },
  ] as const,

  // Volume/Liquid Units
  volume: [
    // Metric System
    { code: 'ml', name: 'Milliliter', symbol: 'ml', system: 'metric' },
    { code: 'cl', name: 'Centiliter', symbol: 'cl', system: 'metric' },
    { code: 'dl', name: 'Deciliter', symbol: 'dl', system: 'metric' },
    { code: 'l', name: 'Liter', symbol: 'l', system: 'metric' },
    { code: 'L', name: 'Liter', symbol: 'L', system: 'metric' },
    { code: 'dal', name: 'Decaliter', symbol: 'dal', system: 'metric' },
    { code: 'hl', name: 'Hectoliter', symbol: 'hl', system: 'metric' },

    // Imperial/US Liquid
    { code: 'fl_oz', name: 'Fluid Ounce', symbol: 'fl oz', system: 'imperial' },
    { code: 'cup', name: 'Cup', symbol: 'cup', system: 'imperial' },
    { code: 'pt', name: 'Pint', symbol: 'pt', system: 'imperial' },
    { code: 'qt', name: 'Quart', symbol: 'qt', system: 'imperial' },
    { code: 'gal', name: 'Gallon', symbol: 'gal', system: 'imperial' },

    // Dry Volume
    { code: 'pk', name: 'Peck', symbol: 'pk', system: 'imperial' },
    { code: 'bu', name: 'Bushel', symbol: 'bu', system: 'imperial' },

    // Cubic Measurements
    { code: 'cm3', name: 'Cubic Centimeter', symbol: 'cm³', system: 'metric' },
    { code: 'dm3', name: 'Cubic Decimeter', symbol: 'dm³', system: 'metric' },
    { code: 'm3', name: 'Cubic Meter', symbol: 'm³', system: 'metric' },
    { code: 'in3', name: 'Cubic Inch', symbol: 'in³', system: 'imperial' },
    { code: 'ft3', name: 'Cubic Foot', symbol: 'ft³', system: 'imperial' },
    { code: 'yd3', name: 'Cubic Yard', symbol: 'yd³', system: 'imperial' },
  ] as const,

  // Length/Distance Units
  length: [
    // Metric System
    { code: 'mm', name: 'Millimeter', symbol: 'mm', system: 'metric' },
    { code: 'cm', name: 'Centimeter', symbol: 'cm', system: 'metric' },
    { code: 'dm', name: 'Decimeter', symbol: 'dm', system: 'metric' },
    { code: 'm', name: 'Meter', symbol: 'm', system: 'metric' },
    { code: 'dam', name: 'Decameter', symbol: 'dam', system: 'metric' },
    { code: 'hm', name: 'Hectometer', symbol: 'hm', system: 'metric' },
    { code: 'km', name: 'Kilometer', symbol: 'km', system: 'metric' },

    // Imperial/US System
    { code: 'in', name: 'Inch', symbol: 'in', system: 'imperial' },
    { code: 'ft', name: 'Foot', symbol: 'ft', system: 'imperial' },
    { code: 'yd', name: 'Yard', symbol: 'yd', system: 'imperial' },
    { code: 'mi', name: 'Mile', symbol: 'mi', system: 'imperial' },

    // Specialized
    {
      code: 'mil',
      name: 'Mil (Thousandth of inch)',
      symbol: 'mil',
      system: 'imperial',
    },
    {
      code: 'thou',
      name: 'Thou (Thousandth of inch)',
      symbol: 'thou',
      system: 'imperial',
    },
  ] as const,

  // Area Units
  area: [
    // Metric System
    { code: 'mm2', name: 'Square Millimeter', symbol: 'mm²', system: 'metric' },
    { code: 'cm2', name: 'Square Centimeter', symbol: 'cm²', system: 'metric' },
    { code: 'm2', name: 'Square Meter', symbol: 'm²', system: 'metric' },
    { code: 'ha', name: 'Hectare', symbol: 'ha', system: 'metric' },
    { code: 'km2', name: 'Square Kilometer', symbol: 'km²', system: 'metric' },

    // Imperial/US System
    { code: 'in2', name: 'Square Inch', symbol: 'in²', system: 'imperial' },
    { code: 'ft2', name: 'Square Foot', symbol: 'ft²', system: 'imperial' },
    { code: 'yd2', name: 'Square Yard', symbol: 'yd²', system: 'imperial' },
    { code: 'ac', name: 'Acre', symbol: 'ac', system: 'imperial' },
    { code: 'mi2', name: 'Square Mile', symbol: 'mi²', system: 'imperial' },
  ] as const,

  // Count/Quantity Units
  count: [
    { code: 'pcs', name: 'Pieces', symbol: 'pcs', system: 'universal' },
    { code: 'ea', name: 'Each', symbol: 'ea', system: 'universal' },
    { code: 'dz', name: 'Dozen', symbol: 'dz', system: 'universal' },
    { code: 'gr', name: 'Gross (144)', symbol: 'gr', system: 'universal' },
    { code: 'pr', name: 'Pair', symbol: 'pr', system: 'universal' },
    { code: 'set', name: 'Set', symbol: 'set', system: 'universal' },
    { code: 'lot', name: 'Lot', symbol: 'lot', system: 'universal' },
    { code: 'box', name: 'Box', symbol: 'box', system: 'universal' },
    { code: 'pack', name: 'Pack', symbol: 'pack', system: 'universal' },
    { code: 'bundle', name: 'Bundle', symbol: 'bundle', system: 'universal' },
    { code: 'case', name: 'Case', symbol: 'case', system: 'universal' },
    { code: 'carton', name: 'Carton', symbol: 'carton', system: 'universal' },
    { code: 'bag', name: 'Bag', symbol: 'bag', system: 'universal' },
    { code: 'sack', name: 'Sack', symbol: 'sack', system: 'universal' },
    { code: 'bottle', name: 'Bottle', symbol: 'bottle', system: 'universal' },
    { code: 'can', name: 'Can', symbol: 'can', system: 'universal' },
    { code: 'jar', name: 'Jar', symbol: 'jar', system: 'universal' },
    { code: 'tube', name: 'Tube', symbol: 'tube', system: 'universal' },
    { code: 'roll', name: 'Roll', symbol: 'roll', system: 'universal' },
    { code: 'sheet', name: 'Sheet', symbol: 'sheet', system: 'universal' },
    {
      code: 'ream',
      name: 'Ream (500 sheets)',
      symbol: 'ream',
      system: 'universal',
    },
  ] as const,

  // Time Units
  time: [
    { code: 'sec', name: 'Second', symbol: 's', system: 'universal' },
    { code: 'min', name: 'Minute', symbol: 'min', system: 'universal' },
    { code: 'hr', name: 'Hour', symbol: 'hr', system: 'universal' },
    { code: 'day', name: 'Day', symbol: 'day', system: 'universal' },
    { code: 'wk', name: 'Week', symbol: 'wk', system: 'universal' },
    { code: 'mo', name: 'Month', symbol: 'mo', system: 'universal' },
    { code: 'yr', name: 'Year', symbol: 'yr', system: 'universal' },
  ] as const,

  // Energy/Power Units
  energy: [
    { code: 'wh', name: 'Watt Hour', symbol: 'Wh', system: 'metric' },
    { code: 'kwh', name: 'Kilowatt Hour', symbol: 'kWh', system: 'metric' },
    { code: 'mwh', name: 'Megawatt Hour', symbol: 'MWh', system: 'metric' },
    {
      code: 'btu',
      name: 'British Thermal Unit',
      symbol: 'BTU',
      system: 'imperial',
    },
    { code: 'therm', name: 'Therm', symbol: 'therm', system: 'imperial' },
    { code: 'cal', name: 'Calorie', symbol: 'cal', system: 'metric' },
    { code: 'kcal', name: 'Kilocalorie', symbol: 'kcal', system: 'metric' },
  ] as const,

  // Temperature Units
  temperature: [
    { code: 'c', name: 'Celsius', symbol: '°C', system: 'metric' },
    { code: 'f', name: 'Fahrenheit', symbol: '°F', system: 'imperial' },
    { code: 'k', name: 'Kelvin', symbol: 'K', system: 'metric' },
    { code: 'r', name: 'Rankine', symbol: '°R', system: 'imperial' },
  ] as const,

  // Textile/Fabric Units
  textile: [
    {
      code: 'yd_fabric',
      name: 'Yard (Fabric)',
      symbol: 'yd',
      system: 'imperial',
    },
    { code: 'm_fabric', name: 'Meter (Fabric)', symbol: 'm', system: 'metric' },
    { code: 'bolt', name: 'Bolt', symbol: 'bolt', system: 'universal' },
    { code: 'spool', name: 'Spool', symbol: 'spool', system: 'universal' },
    { code: 'skein', name: 'Skein', symbol: 'skein', system: 'universal' },
  ] as const,

  // Lumber Units
  lumber: [
    { code: 'bd_ft', name: 'Board Foot', symbol: 'bd ft', system: 'imperial' },
    {
      code: 'lin_ft',
      name: 'Linear Foot',
      symbol: 'lin ft',
      system: 'imperial',
    },
  ] as const,

  // Jewelry Units
  jewelry: [
    { code: 'ct', name: 'Carat', symbol: 'ct', system: 'metric' },
    { code: 'pt', name: 'Point (1/100 carat)', symbol: 'pt', system: 'metric' },
  ] as const,

  // Pharmaceutical Units
  pharmaceutical: [
    { code: 'mcg', name: 'Microgram', symbol: 'μg', system: 'metric' },
    {
      code: 'iu',
      name: 'International Unit',
      symbol: 'IU',
      system: 'universal',
    },
  ] as const,

  // Food Service Units
  food: [
    { code: 'srv', name: 'Serving', symbol: 'srv', system: 'universal' },
    {
      code: 'portion',
      name: 'Portion',
      symbol: 'portion',
      system: 'universal',
    },
    { code: 'slice', name: 'Slice', symbol: 'slice', system: 'universal' },
  ] as const,

  // Digital/Technology Units
  digital: [
    { code: 'kb', name: 'Kilobyte', symbol: 'KB', system: 'binary' },
    { code: 'mb', name: 'Megabyte', symbol: 'MB', system: 'binary' },
    { code: 'gb', name: 'Gigabyte', symbol: 'GB', system: 'binary' },
    { code: 'tb', name: 'Terabyte', symbol: 'TB', system: 'binary' },
    {
      code: 'license',
      name: 'License',
      symbol: 'license',
      system: 'universal',
    },
    { code: 'user', name: 'User', symbol: 'user', system: 'universal' },
    { code: 'seat', name: 'Seat', symbol: 'seat', system: 'universal' },
  ] as const,
} as const;

type UnitCategory = keyof typeof unit_of_measurement;

// Helper Functions
const getAllUnits = (): UnitWithCategory[] => {
  const allUnits: UnitWithCategory[] = [];
  (Object.keys(unit_of_measurement) as UnitCategory[]).forEach((category) => {
    unit_of_measurement[category].forEach((unit) => {
      allUnits.push({ ...unit, category });
    });
  });
  return allUnits;
};

const getUnitsBySystem = (system: string): UnitWithCategory[] => {
  const units: UnitWithCategory[] = [];
  (Object.keys(unit_of_measurement) as UnitCategory[]).forEach((category) => {
    unit_of_measurement[category].forEach((unit) => {
      if (unit.system === system) {
        units.push({ ...unit, category });
      }
    });
  });
  return units;
};

const findUnitByCode = (code: string): UnitWithCategory | null => {
  for (const category of Object.keys(unit_of_measurement) as UnitCategory[]) {
    const unit = unit_of_measurement[category].find((u) => u.code === code);
    if (unit) {
      return { ...unit, category };
    }
  }
  return null;
};

const getCategories = (): UnitCategory[] => {
  return Object.keys(unit_of_measurement) as UnitCategory[];
};

const getUnitsByCategory = (category: UnitCategory): readonly Unit[] => {
  return unit_of_measurement[category] || [];
};

// Export for use in modules
export {
  findUnitByCode,
  getAllUnits,
  getCategories,
  getUnitsByCategory,
  getUnitsBySystem,
  unit_of_measurement,
  type Unit,
  type UnitCategory,
  type UnitWithCategory,
};
