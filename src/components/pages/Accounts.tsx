import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Types
import { Account } from '../../types/account';
import { Store } from '../../types/store';

// Sematic UI
import {
    Container,
    Grid,
    Menu,
    Label,
    Button,
    Icon,
    Modal,
} from 'semantic-ui-react';

// Selectors
import * as accountSelectors from '../../selectors/accounts';

interface MapStateProps {
    accounts: {
        results: string[];
        entities: {
            [id: string]: Account;
        };
    };
}
interface Props extends MapStateProps, RouteComponentProps<any> {}

interface State {
    createDialog: boolean;
}
class Accounts extends React.Component<Props, State> {
    state = {
        createDialog: false,
    };

    render() {
        const { match } = this.props;
        const { results } = this.props.accounts;

        const DeleteButton = (props: { show: boolean }) => {
            if (!props.show) return null;
            return (
                <Button icon={true}>
                    <Icon name="minus" />
                </Button>
            );
        };

        const handleCreateDialog = () =>
            this.setState({
                createDialog: true,
            });

        return (
            <Container>
                <Grid>
                    <Grid.Column mobile={16} tablet={5}>
                        <Menu pointing={true} vertical={true} fluid={true}>
                            {results.map(this.renderAccountMenuItem)}
                        </Menu>

                        <Container textAlign="right">
                            <Button.Group basic={true}>
                                <DeleteButton
                                    show={match.params.id !== 'index'}
                                />
                                <Button
                                    icon={true}
                                    onClick={handleCreateDialog}
                                >
                                    <Icon name="plus" />
                                </Button>
                            </Button.Group>
                        </Container>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={11}>
                        Hallo
                    </Grid.Column>
                </Grid>

                {this.renderCreateDialog()}
            </Container>
        );
    }

    renderAccountMenuItem = (accountId: string) => {
        const { match } = this.props;
        const { entities } = this.props.accounts;
        const account = entities[accountId];
        const labelColor =
            account.balance < 0
                ? 'red'
                : account.balance > 0 ? 'green' : 'grey';

        return (
            <Menu.Item
                key={accountId}
                name={accountId}
                onClick={this.handleClickAccountMenuItem}
                active={match.params.id === account.id}
            >
                {account.name}
                <Label horizontal={true} color={labelColor}>
                    {account.balance}
                </Label>
            </Menu.Item>
        );
    };

    renderCreateDialog() {
        const { createDialog } = this.state;

        const handleClose = () =>
            this.setState({
                createDialog: false,
            });

        return (
            <Modal open={createDialog} onClose={handleClose}>
                <Modal.Header>Hallo</Modal.Header>
            </Modal>
        );
    }

    handleClickAccountMenuItem = (e: any, props: { name: string }) => {
        const { name } = props;
        const { history } = this.props;

        history.push(`/accounts/${name}`);
    };
}

const mapState = (state: Store): MapStateProps => ({
    accounts: {
        results: accountSelectors.getResults(state),
        entities: accountSelectors.getEntities(state),
    },
});

export default connect(mapState)(Accounts);
