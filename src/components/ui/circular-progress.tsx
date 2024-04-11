import * as Progress from '@radix-ui/react-progress';
import React from 'react';

type CircularProgressProps = Progress.ProgressProps & {
  value: number;
  max: number;
  flipH?: boolean;
};

const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, flipH = false, getValueLabel }) => {
  const size = 120;
  const thickness = 12;
  const diameter = size - (thickness * 2);
  const radius = diameter / 2;
  const circumference = diameter * Math.PI;
  const progressCircumference = circumference - (circumference * Math.min(1, value / max));

  return (
    <Progress.Root value={value} max={max} className="inline-block relative h-10 w-10">
      <Progress.Indicator>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-center text-sm font-bold text-yellow-500">
            {getValueLabel && getValueLabel(value, max)}
          </span>
        </div>
        <svg viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
          <circle
            className="stroke-black"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
          >
          </circle>
          <circle
            className="stroke-yellow-500 transition-all duration-200 ease-in-out"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            strokeDasharray={Math.round(circumference)}
            strokeDashoffset={Math.round(progressCircumference)}
            strokeLinecap="round"
            style={{
              transformOrigin: '50% 50%',
              transform: `rotate(-90deg) ${flipH ? 'scale(1, -1)' : ''}`,
            }}
          >
          </circle>
        </svg>
      </Progress.Indicator>
    </Progress.Root>
  );
};

export default CircularProgress;
