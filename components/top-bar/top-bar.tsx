import React from 'react';
import { useTheme } from '@mui/material';

export interface TopBarProps {
	children?: React.ReactNode;
}

export default function TopBar({children}: TopBarProps) {
	return <div>{children}</div>;
}
