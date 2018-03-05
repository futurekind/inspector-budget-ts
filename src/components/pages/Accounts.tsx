import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as numeral from 'numeral';

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
    Header,
} from 'semantic-ui-react';

// Container
import AccountData from '../container/AccountData';

// Selectors
import * as accountSelectors from '../../selectors/accounts';

// Actions
import * as accountActions from '../../actions/accounts';

interface MapStateProps {
    accounts: {
        results: string[];
        entities: {
            [id: string]: Account;
        };
    };
}
interface Props
    extends MapStateProps,
        DispatchProp<string>,
        RouteComponentProps<any> {}

interface State {
    accountDialog: boolean;
    accountData: Account;
}

const emptyAccount: Account = {
    id: '',
    name: '',
    balance: 0,
    createdAt: '',
    updatedAt: '',
};
class Accounts extends React.Component<Props, State> {
    state = {
        accountDialog: false,
        accountData: emptyAccount,
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

        const EditButton = (props: { show: boolean }) => {
            if (!props.show) return null;

            return (
                <Button icon={true} onClick={this.handleOpenEditAccountDialog}>
                    <Icon name="edit" />
                </Button>
            );
        };

        return (
            <Container>
                <Grid>
                    <Grid.Column mobile={16} tablet={5} computer={5}>
                        <Header sub={true}>Accounts</Header>
                        <Menu pointing={true} vertical={true} fluid={true}>
                            {results.map(this.renderAccountMenuItem)}
                        </Menu>

                        <Container textAlign="right">
                            <Button.Group basic={true}>
                                <DeleteButton
                                    show={match.params.id !== 'index'}
                                />
                                <EditButton
                                    show={match.params.id !== 'index'}
                                />
                                <Button
                                    icon={true}
                                    onClick={this.handleOpenCreateAccountDialog}
                                >
                                    <Icon name="plus" />
                                </Button>
                            </Button.Group>
                        </Container>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={11} computer={11}>
                        <Header sub={true}>Transactions</Header>
                    </Grid.Column>

                    <AccountData
                        open={this.state.accountDialog}
                        onClose={this.handleCloseAccountDialog}
                        accountData={this.state.accountData}
                        onChange={this.handleChangeAccountData}
                        onSave={this.handleSaveAccount}
                    />
                </Grid>
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
                    {numeral(account.balance).format('0,00.00')}
                </Label>
            </Menu.Item>
        );
    };

    handleClickAccountMenuItem = (e: any, props: { name: string }) => {
        const { name } = props;
        const { history } = this.props;

        history.push(`/accounts/${name}`);
    };

    handleChangeAccountData = (
        e: any,
        props: { type: 'string' | 'number'; name: string; value: string }
    ) => {
        const { name, value, type } = props;

        this.setState({
            accountData: {
                ...this.state.accountData,
                [name]: type === 'number' ? parseFloat(value) : value,
            },
        });
    };

    handleOpenCreateAccountDialog = () => {
        this.setState({
            accountDialog: true,
            accountData: emptyAccount,
        });
    };

    handleOpenEditAccountDialog = () => {
        const { match, accounts } = this.props;
        const accountData: Account = accounts.entities[match.params.id];

        this.setState({
            accountDialog: true,
            accountData: accountData,
        });
    };

    handleCloseAccountDialog = (e: React.SyntheticEvent<any>) => {
        this.setState({
            accountDialog: false,
            accountData: emptyAccount,
        });
    };

    handleSaveAccount = () => {
        const { accountData } = this.state;
        const dispatch = this.props.dispatch;
        const shouldCreate = !accountData.id;

        if (shouldCreate) {
            if (dispatch) {
                dispatch(
                    accountActions.create({
                        ...accountData,
                        id: 'acc04',
                    })
                );
            }
        } else {
            if (dispatch) {
                dispatch(accountActions.update(accountData));
            }
        }

        this.setState({
            accountData: emptyAccount,
            accountDialog: false,
        });
    };
}

const mapState = (state: Store): MapStateProps => ({
    accounts: {
        results: accountSelectors.getResults(state),
        entities: accountSelectors.getEntities(state),
    },
});

export default connect(mapState)(Accounts);
