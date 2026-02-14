"use client";

import * as React from "react";
import { colorTokens, typographyTokens } from "@/Design-System/tokens";
import { Select } from "@/components/organism/select/select";
export default function SelectTestPage() {
  const [multiValues, setMultiValues] = React.useState<string[]>([]);
  const [singleValue, setSingleValue] = React.useState<string>("");

  const groupedOptions = [
    {
      label: "Fruits",
      options: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Orange", value: "orange" },
        { label: "Strawberry", value: "strawberry" },
        { label: "Grapes", value: "grapes" },
      ],
    },
    {
      label: "Vegetables",
      options: [
        { label: "Carrot", value: "carrot" },
        { label: "Tomato", value: "tomato" },
        { label: "Broccoli", value: "broccoli" },
        { label: "Spinach", value: "spinach" },
        { label: "Cucumber", value: "cucumber" },
      ],
    },
    {
      label: "Drinks",
      options: [
        { label: "Water", value: "water" },
        { label: "Juice", value: "juice" },
        { label: "Soda", value: "soda" },
        { label: "Coffee", value: "coffee" },
        { label: "Tea", value: "tea" },
      ],
    },
    {
      label: "Desserts",
      options: [
        { label: "Cake", value: "cake" },
        { label: "Ice Cream", value: "ice_cream" },
        { label: "Cookie", value: "cookie" },
        { label: "Brownie", value: "brownie" },
      ],
    },
    {
      label: "Fast Food",
      options: [
        { label: "Burger", value: "burger" },
        { label: "Pizza", value: "pizza" },
        { label: "Fries", value: "fries" },
        { label: "Hot Dog", value: "hot_dog" },
      ],
    },
    {
      label: "200 Virtualization items ",
      options: Array.from({ length: 200 }).map((_, i) => ({
        label: `Virtual Item ${i + 1}`,
        value: `v-item-${i + 1}`,
      })),
    },
  ];

  return (
    <div
      className={`${colorTokens.background.dark} min-h-screen flex flex-col items-center justify-start p-10 space-y-10`}
    >
      <h1 className={`${typographyTokens.heading} ${colorTokens.text.light}`}>
        3rd task
      </h1>

      <div className="w-80">
        <h2
          className={`${typographyTokens.subheading} ${colorTokens.text.danger}`}
        >
          Multi Select
        </h2>
        <Select
          options={groupedOptions}
          multiple
          searchable
          value={multiValues}
          onChange={setMultiValues}
        />
        <p className="mt-2 text-sm text-white">
          Selected: {multiValues.length ? multiValues.join(", ") : "none"}
        </p>
      </div>

      <div className="w-80">
        <h2
          className={`${typographyTokens.subheading} ${colorTokens.text.secondary}`}
        >
          Single Select
        </h2>
        <Select
          options={groupedOptions}
          multiple={false}
          searchable
          value={singleValue}
          onChange={setSingleValue}
          placeholder="Pick one option..."
        />
        <p className="mt-2 text-sm text-white">
          Selected: {singleValue || "none"}
        </p>
      </div>
    </div>
  );
}
