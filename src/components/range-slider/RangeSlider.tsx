import { FormControl, OutlinedInput, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Tune } from "@mui/icons-material";
import StringUtils from "../../utils/StringUtils";
import Condition from "../commons/Condition";
import Translate from "../typography/Translate";
import MainButton from "../buttons/MainButton";
import MenuButton from "../buttons/MenuButton";

type RangeSliderProps = {
  text: string;
  start?: number;
  end?: number;
  selected?: number[];
  append?: string;
  prepend?: string;
  disabled?: boolean;
  isLast?: boolean;
  onApply?: (range: number[]) => void;
  onReset?: () => void;
  step?: number;
  iconOnly?: boolean;
};

export const RangeSlider = ({
  text,
  start = 0,
  end = 0,
  selected = [],
  append = "",
  prepend = "",
  disabled = false,
  isLast = false,
  onApply = () => {},
  onReset,
  step = 0.01,
  iconOnly = false,
}: RangeSliderProps) => {
  const [range, setRange] = useState<number[]>(selected);

  useEffect(() => {
    setRange(selected);
  }, [selected]);

  const handleChange = (newRange: number[]) => {
    setRange(newRange);
  };

  const handleMin = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange([+e.target.value, range[1]]);

  const handleMinBlur = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange([+e.target.value < start ? start : +e.target.value, range[1]]);

  const handleMax = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange([range[0], +e.target.value]);

  const handleMaxBlur = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange([range[0], +e.target.value > end ? end : +e.target.value]);

  const isDisabled = disabled || (!+start && !+end);

  return (
    <MenuButton
      placement="bottom-end"
      isLast={isLast}
      openMode="click"
      onClose={() => {
        setRange(selected);
      }}
      disabled={isDisabled}
      action={
        <MainButton
          variant="outlined"
          icon={() => <Tune />}
          disabled={isDisabled}
          ButtonName={text}
          iconOnly={iconOnly}
          color="primary"
          translateParams={{
            params: {
              from:
                prepend +
                StringUtils.numberToFixed(range[0] || 0, 2, false) +
                append,
              to:
                prepend +
                StringUtils.numberToFixed(range[1] || 0, 2, false) +
                append,
            },
          }}
        />
      }
      footer={({ setMenuOpen }) => (
        <div className="px-4 py-2 text-right border-t mr-2">
          <Condition show={Boolean(onReset)}>
            <span className="mr-2">
              <MainButton
                onClick={() => {
                  setMenuOpen(false);
                  onReset?.();
                }}
                variant="outlined"
              >
                <Translate dataKey={"Action.Reset"} />
              </MainButton>
            </span>
          </Condition>
          <MainButton
            onClick={() => {
              setMenuOpen(false);
              onApply(range);
            }}
            disabled={!range.some((value, i) => selected[i] !== value)}
          >
            <Translate dataKey={"Action.Apply"} />
          </MainButton>
        </div>
      )}
    >
      <div className="px-6 py-4 w-80 block">
        <Slider
          getAriaLabel={() => "slider"}
          getAriaValueText={(value) => `${prepend}${value}${append}`}
          value={range}
          disableSwap
          step={step}
          min={+start}
          max={+end}
          valueLabelDisplay="auto"
          onChange={(_, value) => handleChange(value as number[])}
          sx={{ "& .MuiSlider-markLabel": { fontSize: 10 } }}
          size="small"
        />

        <div className="flex justify-between items-center mt-4 gap-4">
          <FormControl className="max-w-[100px]">
            <OutlinedInput
              value={range[0] || 0}
              size="small"
              onChange={handleMin}
              onBlur={handleMinBlur}
              startAdornment={prepend}
              endAdornment={append}
              inputProps={{
                step: step,
                min: start,
                max: end,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </FormControl>

          <span className="text-center font-bold pt-2">
            <Translate dataKey={"Typo.To"} />
          </span>

          <FormControl className="max-w-[100px]">
            <OutlinedInput
              value={range[1] || 0}
              size="small"
              onChange={handleMax}
              onBlur={handleMaxBlur}
              startAdornment={prepend}
              endAdornment={append}
              inputProps={{
                step: step,
                min: start,
                max: end,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </FormControl>
        </div>
      </div>
    </MenuButton>
  );
};

export default RangeSlider;
