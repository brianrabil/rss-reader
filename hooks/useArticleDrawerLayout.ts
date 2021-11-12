import {
	LayoutContext,
	selectArticlesDrawer,
	selectTopNav,
} from "@/context/layout";
import { ComputedDrawerState, DRAWER, LAYOUT_ACTION } from "@/models";
import { SxProps } from "@mui/system";
import { useContext, useEffect } from "react";
import { useDrawerResizable } from "./useDrawerResizable";

/**
 * Controller for the article drawer layout.
 */
export function useArticleDrawerLayout(
	/**
	 * Overrides of the layout state context.
	 */
	overrides?: Partial<ComputedDrawerState>
) {
	const [state, dispatch] = useContext(LayoutContext);
	const { open, width, left, elevation } = selectArticlesDrawer(state);
	const { height } = selectTopNav(state);
	const handleResize = useDrawerResizable(DRAWER.ARTICLES);

	const resizerHandleLeft: number = width + left;

	const sx: SxProps = {
		[`& .MuiDrawer-paper`]: {
			width: width,
			left: overrides?.left ?? left,
			zIndex: elevation,
		},
	};

	const scrollSx: SxProps<{ maxHeight: string; overflowY: string }> = {
		maxHeight: `calc(100vh - ${height ?? 0}px)`,
		overflowY: "scroll",
		["&.MuiList-root"]: {
			paddingTop: 0,
		},
	};

	useEffect(() => {
		dispatch?.({
			type: LAYOUT_ACTION.SET_ARTICLES_DRAWER,
			payload: overrides ?? {},
		});
	}, [overrides]);

	return {
		resizerHandleLeft,
		handleResize,
		open,
		sx,
		elevation,
		scrollSx,
	};
}
