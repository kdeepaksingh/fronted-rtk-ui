import { useState } from "react";
import { Button, ButtonGroup, Chip, Popover, Tooltip } from "@mui/material";
import { TextDecrease, TextFormat, TextIncrease } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
  selectFontSize,
} from "../../features/global/globalSlices";
import Translate from "../../components/typography/Translate";
import Icon from "../../components/icon/Icon";
import { useAppDispatch } from "../../store/store";

export const AccessibilityTools = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const dispatch = useAppDispatch();
  const fontSize = useSelector(selectFontSize);

  return (
    <>
      <Tooltip
        title={
          <Translate dataKey="Typo.AccessibilityTools" className="text-xs" />
        }
        color="primary"
        arrow
        placement="left"
      >
        <Icon
          name="Accessibility"
          style={{ fontSize: "23px" }}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            setAnchor(e.currentTarget);
          }}
        />
      </Tooltip>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="px-4 py-2 w-64">
          <div className="mb-2">
            <Translate
              dataKey="Typo.AccessibilityTools"
              className="text-sm font-semibold text-amber-800"
            />
          </div>

          <div className="border-b mb-2 mt-2 uppercase border-b-amber-900">
            <Translate
              dataKey="Typo.TextSize"
              className="text-sm font-semibold text-amber-800"
            />
          </div>

          <div className="flex">
            <div className="grow">
              <ButtonGroup variant="outlined" size="small">
                <Button
                  onClick={() => dispatch(increaseFontSize())}
                  title="Increase Font Size"
                  style={{ fontSize: "12px" }}
                >
                  <TextIncrease fontSize="small" />
                </Button>
                <Button
                  onClick={() => dispatch(resetFontSize())}
                  title="Reset Font Size"
                  style={{ fontSize: "12px" }}
                >
                  <TextFormat fontSize="small" />
                </Button>
                <Button
                  onClick={() => dispatch(decreaseFontSize())}
                  title="Decrease Font Size"
                  style={{ fontSize: "12px" }}
                >
                  <TextDecrease fontSize="small" />
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <Chip size="small" variant="filled" label={`${fontSize}px`} />
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};
