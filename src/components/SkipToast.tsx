import type { SkipToastProps } from '@/types/types';
import type { FC } from 'react';

export const SkipToast: FC<SkipToastProps> = ({ value, progress }) => {
  return (
    <div className="skip-badge" style={{ left: `${progress}%` }}>
      {value}
    </div>
  );
};
