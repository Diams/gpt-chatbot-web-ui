export interface Model {
  provider: string;
  model_name: string;
}

export const Models: Model[] = [
  {
    provider: "openai",
    model_name: "gpt-4o",
  },
];

export const DefaultModel: Model = Models[0];
