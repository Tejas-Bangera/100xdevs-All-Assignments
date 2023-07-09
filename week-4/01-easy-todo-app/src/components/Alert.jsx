const Alert = ({ setAlert }) => {
  return (
    <>
      <div className="alert alert-success alert-dismissible show" role="alert">
        <strong>To do created!</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => setAlert(false)}
        ></button>
      </div>
    </>
  );
};
export default Alert;
