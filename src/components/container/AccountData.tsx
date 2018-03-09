import * as React from 'react';

// UI
import { Modal, Input, Grid, Button } from 'semantic-ui-react';

// Types
import { Account } from '../../types/account';

interface Props {
    open: boolean;
    onClose: (e: React.SyntheticEvent<any>) => void;
    onChange: (
        e: React.SyntheticEvent<HTMLInputElement>,
        props: { name: string; type: string; value: string }
    ) => void;
    accountData: Account;
    onSave: () => void;
}

const isDisabled = (props: Props): boolean =>
    !props.accountData.name;

const AccountData: React.StatelessComponent<Props> = props => {
    const title = props.accountData.id ? 'Edit Account' : 'Create Account';

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            closeOnDimmerClick={false}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Input
                            name="name"
                            fluid={true}
                            onChange={props.onChange}
                            label="Name"
                            value={props.accountData.name}
                        />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Input
                            name="balance"
                            type="number"
                            fluid={true}
                            onChange={props.onChange}
                            label="Balance"
                            value={props.accountData.balance.toString()}
                        />
                    </Grid.Column>
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

export default AccountData;
