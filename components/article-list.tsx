import React, { useMemo, Fragment } from "react";
import { List, ListItem, Typography, useTheme } from "@mui/material";
import { ArticleListItem } from "@/components";
import { Article, ELEVATION } from "@/models";
import { groupBy, entries, Dictionary } from "lodash";
import { SxProps } from "@mui/system";

export interface ArticleListProps {
  articles?: Article[];
  onArticleClick: (article: Article) => void;
  sx?: SxProps<any>;
}

export interface FilterGroupLabelProps {
  label?: string;
}

export function FilterGroupLabel({ label }: FilterGroupLabelProps) {
  return (
    <ListItem>
      <Typography variant="body2">{label}</Typography>
    </ListItem>
  );
}

// Today
// Yesterday
// This week
// Last week
// Month
// Year

interface ItemGroup {
  label?: string;
  items?: Article[];
}

function formatYear(year: string) {
  const rtf1 = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const diff = getCurrentYear() - parseInt(year);
  return rtf1.format(diff, "year");
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getOtherYearGroups(thisYear: string, itemsByYear?: Dictionary<any>) {
  return entries(itemsByYear)
    .filter(([year]) => year !== thisYear)
    .map(buildYearGroup);
}

function getThisYearGroup(group: ItemGroup[]) {
  const thisYear = new Date().getFullYear();
  return group.find(({ label }) => label === thisYear.toString());
}

function groupItemsByYear(items: any[]) {
  return groupBy(items, ({ date }) => date?.getFullYear());
}

function groupItemsByMonth(items: any[]) {
  return groupBy(items, ({ date }) => date?.getMonth())
}

function buildYearGroup([year, items]: [string, any[]]) {
  const label = year === getCurrentYear().toString() ? "This year" : formatYear(year);
  return { label, items };
}

function useByYear(items: any[]) {
  return useMemo(() => {
    const current = getCurrentYear().toString();
    const itemsByYear = groupItemsByYear(items);
    const otherYears = getOtherYearGroups(current, itemsByYear);
    const thisYear = buildYearGroup([current, itemsByYear[current]]);
    return { thisYear, otherYears };
  }, [items]);
}

function useGroupedByDate(items: Article[] = []) {
  const { thisYear, otherYears } = useByYear(items);

  return useMemo(() => {
    return [thisYear, ...otherYears];
  }, [thisYear, otherYears]);
}

export default function ArticleList({
  articles,
  onArticleClick,
  sx
}: ArticleListProps) {
  const groupedArticles = useGroupedByDate(articles);

  console.log('GROUPED ARTICLES: ', groupedArticles);

  return (
    <List sx={sx}>
      {(groupedArticles ?? []).map((group) => (
        <Fragment key={group.label}>
          <GroupLabelListItem label={group.label} />
          {group.items?.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article}
              onClick={onArticleClick}
            />
          ))}
        </Fragment>
      ))}
    </List>
  );
}

interface ListItemGroupLabelProps {
  label?: string;
}

export function GroupLabelListItem({ label }: ListItemGroupLabelProps) {
  const theme = useTheme();
  const sx: SxProps<any> = {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    position: "sticky",
    top: -1,
    marginTop: -1,
    zIndex: ELEVATION.THREE
  }
  return (
    <ListItem sx={sx}>
      <Typography variant="subtitle2">{label}</Typography>
    </ListItem>
  );
}