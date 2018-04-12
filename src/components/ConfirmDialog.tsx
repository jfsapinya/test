import * as React from 'react';

export interface ConfirmDialogDetails {
  selectorId: string;
  title?: string;
  text?: string;
  showCancel?: boolean;
}

export function ConfirmDialog(props: { details: ConfirmDialogDetails, onConfirm?: () => void, onCancel?: () => void }) {
  const details = props.details;
  const handleConfirm = () => { if (props.onConfirm) { props.onConfirm(); } };
  const handleCancel = () => { if (props.onCancel) { props.onCancel(); } };
  return (
    <div id={details.selectorId} className="modal fade" role="dialog">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{details.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <i className="fa fa-exclamation-triangle fa-3x pull-left" />{details.text}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleConfirm}>Ok</button>
            {details.showCancel &&
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={handleCancel}>Cancel</button>
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export default ConfirmDialog;