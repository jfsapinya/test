import * as React from 'react';
import { ConfirmDialogDetails, ConfirmDialog } from './ConfirmDialog';

function SelectableButton(props: { id: number, text: string, selected: boolean, confirmDialog?: string, onClick: (id: number) => void }) {
  const className = `btn btn-outline-secondary ${props.selected ? 'active' : ''}`;
  if (props.confirmDialog) {
    const dialogId = `#${props.confirmDialog}`;
    return <button type="button" className={className} onClick={() => props.onClick(props.id)} data-toggle="modal" data-target={dialogId}>{props.text}</button>;
  }
  return <button type="button" className={className} onClick={() => props.onClick(props.id)}>{props.text}</button>;
}

interface SelectableButtonGroupProps<T> {
  items: T[];
  confirmDialog?: ConfirmDialogDetails;
}

interface SelectableButtonGroupState {
  selected?: number;
  next?: number;
  confirm?: () => void;
}

export class SelectableButtonGroup<T extends { id: number, name: string }> extends React.Component<SelectableButtonGroupProps<T>, SelectableButtonGroupState> {
  constructor(props: SelectableButtonGroupProps<T>) {
    super(props);
    this.state = { selected: undefined, confirm: undefined, next: undefined };
    this.select = this.select.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  select(id: number): void {
    this.setState({ next: id });
  }

  confirm(): void {
    if (this.state.selected !== this.state.next) {
      this.setState({ selected: this.state.next });
    }
  }

  render() {
    const buttons = this.props.items.map((e, idx) => {
      if (!this.props.confirmDialog) {
        const handleClick = () => { this.select(e.id); this.confirm(); };
        return <SelectableButton key={idx} id={e.id} text={e.name} selected={this.state.selected === e.id} onClick={handleClick} />;
      }
      const dialogId = this.state.selected === e.id ? 'no-modal' : this.props.confirmDialog.selectorId;
      return <SelectableButton key={idx} id={e.id} text={e.name} confirmDialog={dialogId} selected={this.state.selected === e.id} onClick={this.select} />;
    });

    return (
      <div>
        <div className="btn-group mr-auto" role="group">{buttons}</div>
        {this.props.confirmDialog &&
          <ConfirmDialog details={this.props.confirmDialog} onConfirm={this.confirm} />
        }
      </div>
    );
  }
}

export default SelectableButtonGroup;
