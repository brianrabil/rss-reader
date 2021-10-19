import { useMemo } from 'react';
import * as _ from 'lodash';

export function useTruncateText(text?: string, length?: number): string {
  return useMemo(() => {
    return _.truncate(text, {
      length
    })
  }, [text, length]);
}