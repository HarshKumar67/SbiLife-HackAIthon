import { type CustomerData } from '../types/customer';

// Feature scaling function
const scaleFeature = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};

// Constants from the dataset analysis
const FEATURE_RANGES = {
  age: { min: 22, max: 65 },
  annualIncome: { min: 200000, max: 2000000 },
  expenses: { min: 50000, max: 1500000 },
  creditScore: { min: 300, max: 900 },
  websiteVisits: { min: 0, max: 50 },
  activePolicies: { min: 0, max: 5 },
  maturedPolicies: { min: 0, max: 3 },
  emailResponseRate: { min: 0, max: 1 },
  appInteractions: { min: 0, max: 100 },
  feedbackScore: { min: 1, max: 10 }
};

// Feature weights based on the model
const FEATURE_WEIGHTS = {
  age: 0.08,
  annualIncome: 0.15,
  expenses: 0.10,
  creditScore: 0.12,
  websiteVisits: 0.08,
  activePolicies: 0.12,
  maturedPolicies: 0.10,
  emailResponseRate: 0.10,
  appInteractions: 0.08,
  feedbackScore: 0.07
};

export const calculatePropensityScore = (data: CustomerData): number => {
  // Scale each feature
  const scaledFeatures = {
    age: scaleFeature(data.age, FEATURE_RANGES.age.min, FEATURE_RANGES.age.max),
    annualIncome: scaleFeature(data.annualIncome, FEATURE_RANGES.annualIncome.min, FEATURE_RANGES.annualIncome.max),
    expenses: scaleFeature(data.expenses, FEATURE_RANGES.expenses.min, FEATURE_RANGES.expenses.max),
    creditScore: scaleFeature(data.creditScore, FEATURE_RANGES.creditScore.min, FEATURE_RANGES.creditScore.max),
    websiteVisits: scaleFeature(data.websiteVisits, FEATURE_RANGES.websiteVisits.min, FEATURE_RANGES.websiteVisits.max),
    activePolicies: scaleFeature(data.activePolicies, FEATURE_RANGES.activePolicies.min, FEATURE_RANGES.activePolicies.max),
    maturedPolicies: scaleFeature(data.maturedPolicies, FEATURE_RANGES.maturedPolicies.min, FEATURE_RANGES.maturedPolicies.max),
    emailResponseRate: data.emailResponseRate, // Already between 0 and 1
    appInteractions: scaleFeature(data.appInteractions, FEATURE_RANGES.appInteractions.min, FEATURE_RANGES.appInteractions.max),
    feedbackScore: scaleFeature(data.feedbackScore, FEATURE_RANGES.feedbackScore.min, FEATURE_RANGES.feedbackScore.max)
  };

  // Calculate weighted sum
  const weightedSum = 
    scaledFeatures.age * FEATURE_WEIGHTS.age +
    scaledFeatures.annualIncome * FEATURE_WEIGHTS.annualIncome +
    scaledFeatures.expenses * FEATURE_WEIGHTS.expenses +
    scaledFeatures.creditScore * FEATURE_WEIGHTS.creditScore +
    scaledFeatures.websiteVisits * FEATURE_WEIGHTS.websiteVisits +
    scaledFeatures.activePolicies * FEATURE_WEIGHTS.activePolicies +
    scaledFeatures.maturedPolicies * FEATURE_WEIGHTS.maturedPolicies +
    scaledFeatures.emailResponseRate * FEATURE_WEIGHTS.emailResponseRate +
    scaledFeatures.appInteractions * FEATURE_WEIGHTS.appInteractions +
    scaledFeatures.feedbackScore * FEATURE_WEIGHTS.feedbackScore;

  // Convert to 0-100 scale and round to 2 decimal places
  return Math.round(weightedSum * 100 * 100) / 100;
};