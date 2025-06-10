import Modal from "../../components/modal/Modal"

const FeedbackForm = ({open, onClose}) => {
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
