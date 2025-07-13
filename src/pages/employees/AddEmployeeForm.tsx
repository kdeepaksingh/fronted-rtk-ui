import Modal from "../../components/modal/Modal";
import AddEmployee from "./AddEmployee";

interface AddEmployeeProps {
  open: boolean;
  onClose: () => void;
}

const AddEmployeeForm = ({ open, onClose }: AddEmployeeProps) => {
  return (
    <div>
      <Modal
        title={"Typo.AddNewEmployee"}
        maxWidth="md"
        height={"h-auto overflow-x-hidden"}
        open={open}
        onClose={onClose}
        scroll="body"
      >
        <AddEmployee onClose={onClose} />
      </Modal>
    </div>
  );
};

export default AddEmployeeForm;
