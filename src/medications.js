export const medications = [
  {
    id: "tylenol",
    name: "Tylenol",
    genericName: "Acetaminophen",
    dosePerKg: 15,
    concentration: 32,
    formulationOptions: [
      { label: "160 mg/5 mL Liquid", mgPerMl: 32 },
      { label: "325 mg Tablet", tabletMg: 325, maxTablets: 2 },
      { label: "500 mg Tablet", tabletMg: 500, maxTablets: 2 },
    ],
    dispensingUnit: { label: "tsp (5 mL) per dose", volumeMl: 5 },
    adultDoseMg: 1000,
    adultMaxDailyMg: 4000,
    frequency: "Every 4–6 hours",
    maxDosePerKgPerDay: 75,
    minDosePerKg: 10,
    dosesPerDay: 4,
    warning: "Max 5 doses per 24 hours",
  },
  {
    id: "advil",
    name: "Advil",
    genericName: "Ibuprofen",
    dosePerKg: 7.5,
    concentration: 20,
    formulationOptions: [
      { label: "100 mg/5 mL Liquid", mgPerMl: 20 },
      { label: "200 mg Tablet", tabletMg: 200 },
      { label: "400 mg Tablet", tabletMg: 400 },
      { label: "600 mg Tablet", tabletMg: 600 },
      { label: "800 mg Tablet", tabletMg: 800 },
    ],
    dispensingUnit: { label: "tsp (5 mL) per dose", volumeMl: 5 },
    adultDoseMg: 800,
    adultMaxDailyMg: 3200,
    frequency: "Every 6–8 hours",
    maxDosePerKgPerDay: 30,
    minDosePerKg: 5,
    dosesPerDay: 3,
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    dosePerKg: 13.3,
    concentration: 50,
    formulationOptions: [
      { label: "125 mg/5 mL Liquid", mgPerMl: 25 },
      { label: "200 mg/5 mL Liquid", mgPerMl: 40 },
      { label: "250 mg/5 mL Liquid", mgPerMl: 50 },
      { label: "400 mg/5 mL Liquid", mgPerMl: 80 },
      { label: "500 mg Tablet", tabletMg: 500 },
      { label: "875 mg Tablet", tabletMg: 875 },
    ],
    dispensingUnit: { label: "tsp (5 mL) per dose", volumeMl: 5 },
    frequency: "Every 8 hours",
    roundDown: true,
    dosingRegimens: [
      {
        id: "standard",
        label: "Standard — q8h (20–40 mg/kg/day)",
        dosePerKg: 13.3,
        minDosePerKg: 6.667,
        frequency: "Every 8 hours",
        maxSingleDoseMg: 500,
        maxDosePerKgPerDay: 40,
        dosesPerDay: 3,
        adultDoseMg: 500,
        adultMinDoseMg: 250,
      },
      {
        id: "high",
        label: "High Dose — q12h (25–45 mg/kg/day)",
        dosePerKg: 22.5,
        minDosePerKg: 12.5,
        frequency: "Every 12 hours",
        maxSingleDoseMg: 875,
        maxDosePerKgPerDay: 45,
        dosesPerDay: 2,
        adultDoseMg: 875,
        adultMinDoseMg: 500,
      },
    ],
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    genericName: "Azithromycin (Z-Pak)",
    dosePerKg: 10,
    concentration: 40,
    formulationOptions: [
      { label: "100 mg/5 mL Liquid", mgPerMl: 20 },
      { label: "200 mg/5 mL Liquid", mgPerMl: 40 },
      { label: "250 mg Tablet", tabletMg: 250 },
      { label: "500 mg Tablet", tabletMg: 500 },
    ],
    dispensingUnit: { label: "tsp (5 mL) per dose", volumeMl: 5 },
    adultDoseMg: 500,
    adultMaxDailyMg: 500,
    adultNote: "Z-Pak: 2 tabs (500 mg) on Day 1, then 1 tab (250 mg) on Days 2–5",
    frequency: "Once daily",
    maxDosePerKgPerDay: 10,
    dosesPerDay: 1,
    warning: "Max single dose 500 mg",
    dayDoses: [
      { id: "day1", label: "Day 1", dosePerKg: 10, maxMg: 500, frequency: "Once daily — Day 1" },
      { id: "day2plus", label: "Day 2+", dosePerKg: 5, maxMg: 250, frequency: "Once daily — Days 2–5" },
    ],
  },
  // Injectable local anesthetics. mg/kg values are the AAPD Reference Manual
  // 2025-2026 table (Best Practices: Use of Local Anesthesia), which AAPD sets
  // more conservatively than the manufacturer's recommended dose. Cartridge
  // volume is 1.7 mL there, matching CARPULE_ML in src/chart/anesthetics.js.
  // These entries are the single source of truth for the chart's anesthesia
  // dose check as well as the Dosage tab.
  {
    id: "lidocaine",
    name: "Lidocaine",
    genericName: "Lidocaine 2% w/ Epi 1:100,000",
    dosePerKg: 4.4,
    concentration: 20,
    formulationOptions: [
      { label: "Carpule (1.7 mL)", mgPerMl: 20 },
    ],
    dispensingUnit: { label: "Carpule (1.7 mL)", volumeMl: 1.7 },
    frequency: "Single dose",
    // 300 mg, not the manufacturer's 500 mg: the pediatric dental literature
    // caps a single appointment at 300 mg, and AAPD's table gives mg/kg only.
    // Only bites above ~68 kg, where 4.4 mg/kg would otherwise exceed it.
    absoluteMaxMg: 300,
    warning: "Max 4.4 mg/kg (2 mg/lb) with epinephrine; 300 mg per appointment",
  },
  {
    id: "articaine",
    name: "Articaine",
    genericName: "Articaine 4% w/ Epi 1:100,000",
    dosePerKg: 7,
    concentration: 40,
    formulationOptions: [
      { label: "Carpule (1.7 mL)", mgPerMl: 40 },
    ],
    dispensingUnit: { label: "Carpule (1.7 mL)", volumeMl: 1.7 },
    frequency: "Single dose",
    // Manufacturer's absolute maximum (~7 cartridges). AAPD's table lists the
    // mg/kg figure only, so this cap comes from the product labeling.
    absoluteMaxMg: 500,
    warning: "Max 7 mg/kg (3.2 mg/lb)",
    // `contraindication` is rendered unconditionally by the Dosage tab, unlike
    // `warning`, which is suppressed when a computed per-day limit says the same
    // thing. An age restriction must never be the line that gets suppressed.
    contraindication: "Not recommended under 4 years of age",
  },
  {
    id: "mepivacaine",
    name: "Mepivacaine",
    genericName: "Mepivacaine 3% plain",
    dosePerKg: 4.4,
    concentration: 30,
    formulationOptions: [
      { label: "Carpule (1.7 mL)", mgPerMl: 30 },
    ],
    dispensingUnit: { label: "Carpule (1.7 mL)", volumeMl: 1.7 },
    frequency: "Single dose",
    // UNKNOWN, and stays that way until CJ says otherwise: AAPD is this app's
    // source of record for maximum doses and its table has no absolute column,
    // so there is no AAPD per-appointment figure for mepivacaine to apply.
    absoluteMaxMg: null,
    warning: "Max 4.4 mg/kg (2 mg/lb). No AAPD per-appointment cap published",
    // Warning-only, never read by the calculation. The FDA label for Carbocaine
    // (2018) states a single dose, or the total of a series in one procedure,
    // "should not usually exceed 400 mg" in healthy normal-sized adults — an
    // adult manufacturer figure, which is why it is not adopted as a cap here.
    // The widely repeated pediatric 300 mg could not be traced to a primary
    // source. Without this, 4.4 mg/kg alone would hand back 528 mg at 120 kg
    // with nothing said about it.
    unconfirmedAbsoluteMaxMg: { mg: 400, source: "FDA label for adults" },
  },
  {
    id: "bupivacaine",
    name: "Bupivacaine",
    genericName: "Bupivacaine 0.5% w/ Epi 1:200,000",
    dosePerKg: 1.3,
    concentration: 5,
    formulationOptions: [
      { label: "Carpule (1.7 mL)", mgPerMl: 5 },
    ],
    dispensingUnit: { label: "Carpule (1.7 mL)", volumeMl: 1.7 },
    frequency: "Single dose",
    absoluteMaxMg: 90,
    warning: "Max 1.3 mg/kg (0.6 mg/lb); 90 mg per appointment",
    contraindication: "Not recommended under 12 years of age",
  },
];
