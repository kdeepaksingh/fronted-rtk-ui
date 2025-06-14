/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Grid from "@mui/material/Grid";
import RHFTextArea from "../inputs/RHFTextArea";
import Modal from "../modal/Modal";
import FormValidationUtils from "../../utils/FormValidationsUtils";
import HelpCharacterCount from "../typography/HelpCharacterCount";

type DataTextAreaProps = {
  value?: string;
  data: Record<string, any>;
  node: {
    rowPinned?: "top" | "bottom" | null;
  };
  colDef: {
    field: string;
    cellRendererParams: {
      onApply: (args: {
        oldValue?: string;
        newValue: string;
        [key: string]: any;
      }) => void;
      render?: (args: any) => JSX.Element;
      maxCharacters?: number;
      hideOnFooter?: boolean;
      placeHolder?: string;
    };
  };
};

export const DataTextArea = (props: DataTextAreaProps): JSX.Element | null => {
  const {
    value,
    colDef: {
      field,
      cellRendererParams: {
        onApply,
        render,
        maxCharacters = 300,
        hideOnFooter = false,
        placeHolder = "",
      },
    },
    data,
    node: { rowPinned },
  } = props;

  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState<string>(value || "");

  if ((hideOnFooter && rowPinned === "bottom") || !data || data?.isTotalRow) {
    return null;
  }

  const handleChange = (val: string) => {
    setRemarks(val);
  };

  const close = () => {
    setOpen(false);
    setRemarks(value || "");
  };

  const FormInput = (
    <div>
      <div
        onClick={() => {
          if (data[`${field}_edit`] !== false) setOpen(true);
        }}
      >
        <RHFTextArea
          maxHeight={1}
          value={value || ""}
          className="w-full leading-snug !px-2 !py-1 !text-xs !outline-none resize-none"
          required={data[`${field}_required`] === true}
          disabled={data[`${field}_edit`] === false}
          autoFocus={false}
        />
      </div>
      <Modal
        title="SubHeader.Remarks"
        maxWidth="sm"
        height="h-auto"
        fullWidth={false}
        open={open}
        onClose={close}
        actions={[
          {
            ButtonName: "Action.Okay",
            type: "primary",
            variant: "contained",
            className: "px-4 py-2 text-right border-t",
            onClick: () => {
              const cleanString = remarks
                .replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~=\s-/]/g, "")
                .replace(/\s+/g, " ")
                .trim();

              onApply({
                ...props,
                oldValue: value,
                newValue: cleanString,
              });
              setOpen(false);
            },
            disabled:
              value === remarks ||
              !FormValidationUtils.allowEveryThing(remarks, 20),
          },
          {
            ButtonName: "Action.Cancel",
            type: "error",
            variant: "outlined",
            className: "px-4 py-2 text-left border-t",
            onClick: close,
          },
        ]}
      >
        <Grid
          container
          spacing={2}
          sx={{ width: 372 }}
          className="flex justify-center"
        >
          <Grid item xs={12}>
            {/* <InputLabel label="Label.EnterRemarks" /> */}
            <RHFTextArea
              value={remarks}
              minHeight={8}
              maxHeight={8}
              placeholder={placeHolder || "Placeholder.EnterRemarks"}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full mt-1 leading-5 max-h-[200px] resize-none"
              autoFocus
              maxCharCount={maxCharacters}
              error={
                Boolean(remarks) &&
                !FormValidationUtils.allowEveryThing(remarks, 20)
              }
              helptooltip="Validations.AddCropRemarks"
            />
            <HelpCharacterCount max={maxCharacters} min={3} value={remarks} />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );

  if (render) {
    return render({ FormInput, ...props });
  }

  return FormInput;
};

export default DataTextArea;
