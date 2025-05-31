import { Models } from "@/lib/models/models";

export default function ModelSelector() {
  return (
    <div className="flex flex-row gap-2">
      <div>model:</div>
      <select className="w-[200px] bg-white dark:bg-gray-500 rounded-md">
        {Models.map((model, index) => (
          <option key={index} value={`${model.provider}/${model.model_name}`}>
            {`${model.provider}/${model.model_name}`}
          </option>
        ))}
      </select>
    </div>
  );
}
