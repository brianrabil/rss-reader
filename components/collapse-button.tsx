import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface CollapseButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function DrawerToggleButton({
  onClick,
  isOpen
}: CollapseButtonProps) {
  return (
    <IconButton onClick={onClick}>
      {isOpen ? (
        <ChevronLeftIcon />
      ) : (
        <ChevronRightIcon />
      )}
    </IconButton>
  )
}