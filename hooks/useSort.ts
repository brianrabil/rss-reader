import { useMemo } from "react";
import { SortBy, Article } from "./../models";
import * as _ from "lodash";

export const useSort = (list: Article[], sortBy?: SortBy): Article[] => {
  return useMemo(() => 
    (sortBy) ? _.sortBy(list, sortBy) : list, 
    [sortBy, list]
  );
};
