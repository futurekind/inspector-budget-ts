import * as React from 'react';

// UI
import { Modal, Button } from 'semantic-ui-react';

// Types
import { Transaction } from '../../types/transactions';

import './data-container.css';

interface Props {
    open: boolean;
    onClose: (e: React.SyntheticEvent<any>) => void;
    onChange: (
        e: React.SyntheticEvent<HTMLInputElement>,
        props: { name: string; type: string; value: string }
    ) => void;
    transactionData: Transaction;
    onSave: () => void;
}

const isDisabled = (props: Props): boolean => false;

const TransactionData: React.StatelessComponent<Props> = props => {
    const title = props.transactionData.id
        ? 'Edit Transaction'
        : 'Create Transaction';

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            closeOnDimmerClick={false}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <div className="data-container">
                    <div>HAllp</div>
                    <div>Pellso</div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button
                    primary={true}
                    disabled={isDisabled(props)}
                    onClick={props.onSave}
                >
                    Save
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default TransactionData;
