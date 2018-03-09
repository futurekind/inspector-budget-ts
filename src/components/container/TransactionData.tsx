import * as React from 'react';

// UI
import { Modal, Grid, Button } from 'semantic-ui-react';

// Types
import { Transaction } from '../../types/transactions';

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
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={8} />
                    <Grid.Column mobile={16} tablet={8} computer={8} />
                </Grid>
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
