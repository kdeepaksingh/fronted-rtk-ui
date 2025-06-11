import Modal from "../../components/modal/Modal"

interface FeedbackFormProps {
  open: boolean;
  onClose: () => void;
}
const FeedbackForm = ({open, onClose} : FeedbackFormProps) => {
  return (
    <div>
      <Modal
        title={"Typo.ProvideFeedback"}
        maxWidth="sm"
        height={"h-auto overflow-x-hidden"}
        open={open}
        onClose={onClose}
        scroll="body"
      >
        <h1>Feedback form data</h1>
      </Modal>
    </div>
  )
}

export default FeedbackForm
