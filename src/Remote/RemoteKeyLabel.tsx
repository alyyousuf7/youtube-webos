import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

import { RemoteKey } from './constants';

const containerVariants = cva('relative top-0.5 inline-flex items-center rounded-full mx-0.5 py-0.25 pl-0.5 pr-1.5', {
  variants: {
    remoteKey: {
      [RemoteKey.RED]: 'border border-red-800',
      [RemoteKey.GREEN]: 'border border-green-800',
      [RemoteKey.YELLOW]: 'border border-yellow-800',
      [RemoteKey.BLUE]: 'border border-blue-800',
      unknown: 'border border-gray-800',
    },
  },
  defaultVariants: {
    remoteKey: 'unknown',
  },
});

const labelVariants = cva('h-4 w-4 rounded-full mr-1', {
  variants: {
    remoteKey: {
      [RemoteKey.RED]: 'text-white bg-red-600',
      [RemoteKey.GREEN]: 'text-white bg-green-600',
      [RemoteKey.YELLOW]: 'text-white bg-yellow-600',
      [RemoteKey.BLUE]: 'text-white bg-blue-600',
      unknown: 'text-white bg-gray-600',
    },
  },
  defaultVariants: {
    remoteKey: 'unknown',
  },
});

const variantLabel = {
  [RemoteKey.RED]: 'Red',
  [RemoteKey.GREEN]: 'Green',
  [RemoteKey.YELLOW]: 'Yellow',
  [RemoteKey.BLUE]: 'Blue',
  unknown: 'Unknown',
};

const RemoteKeyLabel: React.FC<VariantProps<typeof labelVariants>> = ({ remoteKey }) => {
  return (
    <span className={cn(containerVariants({ remoteKey }))}>
      <span className={cn(labelVariants({ remoteKey }))}></span>
      <span className="text-sm">{variantLabel[remoteKey ?? 'unknown']}</span>
    </span>
  );
};

export default RemoteKeyLabel;
