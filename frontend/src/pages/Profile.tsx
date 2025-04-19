import React from "react";

type BasicInfoProps = {
  name: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  fitnessGoal: string;
};

const BasicInfo: React.FC<BasicInfoProps> = ({
  name,
  age,
  gender,
  height,
  weight,
  fitnessGoal,
}) => {
  return (
    <div className="font-lg mx-auto w-1/2 space-y-4 rounded-2xl bg-gray-500 p-4 text-black">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="mb-1 text-xl font-bold">Fabian{name}</h2>
          <p>
            {age} y/o • {gender}
          </p>
        </div>
      </div>
      <p>
        <strong>Height:</strong> {height} cm
      </p>
      <p>
        <strong>Weight:</strong> {weight} kg
      </p>
      <div>
        <p>
          <strong>Fitness Goal:</strong> {fitnessGoal}
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
