import React, { useState, useRef, useMemo, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useSelector } from "react-redux";
import sortBy from "lodash/sortBy";
import AdditionalContent from "./AdditionalContent";
import type { RootState } from "../../store/store";
import StringUtils from "../../utils/StringUtils";
import RHFTextInput from "../inputs/RHFTextInput";
import Condition from "../commons/Condition";
import Translate from "../typography/Translate";
import HandleOutsideClick from "../../utils/HandleOutsideClick";
import BasicList from "../list/BasicList";

interface AutoCompleteProps {
  placeholder?: string;
  label?: string;
  required?: boolean;
  width?: string;
  onSelect: (item: Record<string, unknown>) => void;
  value?: string;
  showAction?: boolean;
  disabled?: boolean;
  sort?: boolean;
  otherCrops?: boolean;
  dataKey: string;
  children?: React.ReactNode;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  placeholder = "",
  label = "",
  required = true,
  width = "w-full",
  onSelect,
  value = "",
  showAction = true,
  disabled = false,
  sort = false,
  otherCrops = true,
  dataKey,
  children,
}) => {
  const data = useSelector((state: RootState) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchor, setAnchor] = useState(false);
  const [position, setPosition] = useState(-1);
  const autoCompleteReference = useRef<HTMLDivElement>(null!);
  const listReference = useRef<HTMLDivElement | null>(null);

  HandleOutsideClick(autoCompleteReference, () => {
    setAnchor(false);
  });

  const filterData = useMemo(() => {
    return searchTerm
      ? (
          data[dataKey as keyof typeof data] as unknown as Array<
            Record<string, unknown>
          >
        )
          .map((item) => {
            const matched = StringUtils.matchedWords({
              sentence: item[dataKey as keyof typeof item] as string,
              searchTerm,
            });
            return {
              ...item,
              matched: matched
                ? (item[dataKey as keyof typeof item] as string).length -
                  matched
                : -1,
            };
          })
          .filter(({ matched }) => matched > -1)
      : dataKey in data
      ? (data[dataKey as keyof typeof data] as unknown as Array<
          Record<string, unknown>
        >)
      : [];
  }, [searchTerm, data, dataKey]);

  const handleSelect = (item: Record<string, unknown> = {}) => {
    setAnchor(false);
    onSelect(item);
    setSearchTerm("");
  };

  const sortedData = useMemo((): Array<Record<string, unknown>> => {
    if (sort && !searchTerm) return sortBy(filterData, dataKey);
    if (searchTerm) return sortBy(filterData, ["matched"]);
    return filterData;
  }, [sort, filterData, searchTerm, dataKey]);

  const scrollTo = (pos: number) => {
    const element = listReference.current?.querySelector(
      `li:nth-child(${pos + 1})`
    );
    element?.scrollIntoView({ block: "nearest", inline: "nearest" });
    return pos;
  };

  const setPositionData = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 9:
        setAnchor(false);
        break;
      case 38:
        setAnchor(true);
        setPosition((prev) => (prev > 0 ? scrollTo(prev - 1) : scrollTo(0)));
        break;
      case 40:
        setAnchor(true);
        setPosition((prev) =>
          scrollTo(prev + 1 < sortedData.length ? prev + 1 : prev)
        );
        break;
      case 13:
        handleSelect(sortedData[position]);
        break;
      default:
        setAnchor(true);
        break;
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (listReference.current) {
      scrollTo(position);
    }
  }, [position]);

  return (
    <div ref={autoCompleteReference} className={`${width} relative`}>
      <div className="z-10">
        <RHFTextInput
          label={label}
          defaultValue={searchTerm || value}
          placeholder={placeholder}
          required={required}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            if (value) onSelect({});
          }}
          onFocus={() => setAnchor(true)}
          onIconClick={() => handleSelect()}
          icon={value && !disabled ? "CloseIcon" : undefined}
          disabled={disabled}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => setPositionData(e)}
          maxCharCount={100}
        />
      </div>

      <Condition show={Boolean(anchor && showAction)}>
        <div className="absolute w-full shadow-lg border-x border-b z-50 -mt-2 bg-white">
          <div
            className={`${otherCrops ? "mb-8" : "mb-0"} overflow-auto max-h-24`}
            ref={listReference}
          >
            <Condition show={Boolean(sortedData.length)}>
              <BasicList
                data={sortedData as Array<Record<string, string | number>>}
                onClick={handleSelect}
                dataKey={dataKey}
                position={position}
                setPosition={() => setPosition(position)}
              />
            </Condition>
            <Condition show={!sortedData.length}>
              <div className="text-center p-4 text-upag-gray-01 text-xs">
                <Translate dataKey="Empty.NoRows" />
              </div>
            </Condition>
          </div>
          <Condition show={otherCrops}>
            <div className="!w-full absolute bottom-0">
              <Condition show={Boolean(children)}>{children}</Condition>
              <Condition show={!children}>
                <AdditionalContent onClick={() => {}} />
              </Condition>
            </div>
          </Condition>
        </div>
      </Condition>
    </div>
  );
};

export default AutoComplete;
