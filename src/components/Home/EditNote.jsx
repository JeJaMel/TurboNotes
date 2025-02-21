import styles from "../../css/Home/EditNote.module.css";
import propTypes from "prop-types";

const EditNote = ({
  updatedTitle,
  setUpdatedTitle,
  updatedContent,
  setUpdatedContent,
  handleEdit,
  onCancel,
}) => {
  return (
    <div className={styles.editForm}>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        placeholder="Edit title"
      />
      <textarea
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        placeholder="Edit content"
      />
      <button onClick={handleEdit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

EditNote.propTypes = {
  updatedTitle: propTypes.string.isRequired,
  setUpdatedTitle: propTypes.func.isRequired,
  updatedContent: propTypes.string.isRequired,
  setUpdatedContent: propTypes.func.isRequired,
  handleEdit: propTypes.func.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default EditNote;
