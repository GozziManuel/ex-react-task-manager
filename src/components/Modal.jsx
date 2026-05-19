export default function Modal({ removeTask, setModalAppear }) {
  return (
    <div className="backgroundModal">
      <div className="modale">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Attenzione!</h5>
            </div>
            <div className="modal-body">
              <p>Sei sicuro di voler Eliminare la task?</p>
            </div>
            <div className="modal-footer ">
              <button className="btn btn-danger me-3" onClick={removeTask}>
                Sì
              </button>
              <button className="btn btn-primary" onClick={setModalAppear}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
