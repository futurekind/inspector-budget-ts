import * as React from 'react';

// UI
import { Modal, Button, Input, Dropdown, Form } from 'semantic-ui-react';

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

const payeeOptions = [{ value: 'fab', text: 'Fabian' }];

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
                    <Form.Field
                        label="Date"
                        type="date"
                        name="date"
                        value={props.transactionData.date}
                        onChange={props.onChange}
                        control={Input}
                        fluid={true}
                        required={true}
                    />

                    <Form.Field
                        label="Volume"
                        type="number"
                        name="volume"
                        value={props.transactionData.volume}
                        onChange={props.onChange}
                        control={Input}
                        fluid={true}
                        required={true}
                    />

                    <Form.Field
                        name="payee"
                        label="Payee"
                        onChange={props.onChange}
                        value={props.transactionData.payeeId}
                        options={payeeOptions}
                        selection={true}
                        search={true}
                        fluid={true}
                        control={Dropdown}
                    />

                    <Form.Field
                        name="categoryId"
                        label="Category"
                        onChange={props.onChange}
                        value={props.transactionData.categoryId}
                        options={payeeOptions}
                        selection={true}
                        search={true}
                        fluid={true}
                        control={Dropdown}
                        required={true}
                    />
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
