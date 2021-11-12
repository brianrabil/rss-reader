import React, { useMemo, Fragment } from "react";
import { List, ListItem, Typography, useTheme } from "@mui/material";
import { ArticleListItem } from "@/components";
import { Article, ELEVATION } from "@/models";
import { groupBy, entries } from "lodash";
import { SxProps } from "@mui/system";

export interface ArticleListProps {
  articles?: Article[];
  onArticleClick?: (article: Article) => void;
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

interface ItemSegment {
  label?: string;
  items?: Article[];
}

function formatYear(year: string): string {
  const current = new Date().getFullYear();
  const rtf1 = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const diff = current - parseInt(year);
  return rtf1.format(diff, "year");
}

function segmentByYear(items: any[]): ItemSegment[] {
  const current = new Date().getFullYear().toString();
  const itemsByYear = groupBy(items, ({ date }) => date?.getFullYear());
  return entries(itemsByYear).map(([year, items]) => {
    const label = year === current ? "This year" : formatYear(year);
    return { label, items };
  }); 
}

function segmentByMonth(items: any[]) {
  const itemsByMonth = groupBy(items, ({ date }) => date?.getMonth());
  return entries(itemsByMonth).map(([month, items]) => {
    const monthNum = parseInt(month);
    const label = new Date(0, monthNum, 1).toLocaleString("en", { month: "long" });
    return { label, items };
  });
}

function segmentByWeek() {
  // TODO
}

function useGroupedByDate(items: Article[] = []) {
  const yearSegments = segmentByYear(items);

  return useMemo(() => {
    return yearSegments;
  }, [yearSegments]);
}

export default function ArticleList({
  articles,
  onArticleClick,
  sx
}: ArticleListProps) {
  const groupedArticles = useGroupedByDate(articles);

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