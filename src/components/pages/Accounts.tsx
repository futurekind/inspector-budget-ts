import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import * as numeral from 'numeral';
import { v4 } from 'uuid';

// Types
import { Account } from '../../types/account';
import { Transaction } from '../../types/transactions';
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
    Modal,
    Segment,
    SemanticICONS,
} from 'semantic-ui-react';

// Container
import AccountData from '../container/AccountData';
import TransactionData from '../container/TransactionData';

// Selectors
import * as accountSelectors from '../../selectors/accounts';
import * as taSelectors from '../../selectors/transactions';

// Actions
import * as accountActions from '../../actions/accounts';

interface MapStateProps {
    accounts: {
        results: string[];
        entities: {
            [id: string]: Account;
        };
    };
    transactions: {
        results: string[];
        entities: {
            [id: string]: Transaction;
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
    accountToDelete: string;
    transactionDialog: boolean;
    transactionData: Transaction;
}

const emptyAccount: Account = {
    id: '',
    name: '',
    balance: 0,
    createdAt: '',
    updatedAt: '',
};

const emptyTransaction: Transaction = {
    accountId: '',
    categoryId: '',
    cleared: false,
    createdAt: '',
    date: '',
    id: '',
    updatedAt: '',
    volume: 0,
};

const ActionButton = (props: {
    show: boolean;
    onClick: () => void;
    iconName: SemanticICONS;
}) => {
    if (!props.show) return null;
    return (
        <Button icon={true} onClick={props.onClick}>
            <Icon name={props.iconName} />
        </Button>
    );
};
class Accounts extends React.Component<Props, State> {
    state = {
        accountDialog: false,
        accountData: emptyAccount,
        accountToDelete: '',
        transactionDialog: false,
        transactionData: emptyTransaction,
    };

    render() {
        const { match } = this.props;
        const { results } = this.props.accounts;

        const handleDeleteAccount = () =>
            this.setState({
                accountToDelete: match.params.id,
            });

        if (match.params.id === 'index' && results.length > 0)
            return <Redirect to={`/accounts/${results[0]}`} />;

        return (
            <Container>
                <Grid>
                    <Grid.Column mobile={16} tablet={5} computer={5}>
                        <Header sub={true}>Accounts</Header>
                        <Menu pointing={true} vertical={true} fluid={true}>
                            {this.renderZeroAccountResult()}
                            {results.map(this.renderAccountMenuItem)}
                        </Menu>

                        <Container textAlign="right">
                            <Button.Group basic={true}>
                                <ActionButton
                                    show={match.params.id !== 'index'}
                                    onClick={handleDeleteAccount}
                                    iconName="minus"
                                />
                                <ActionButton
                                    show={match.params.id !== 'index'}
                                    onClick={this.handleOpenEditAccountDialog}
                                    iconName="edit"
                                />
                                <ActionButton
                                    show={true}
                                    onClick={this.handleOpenCreateAccountDialog}
                                    iconName="plus"
                                />
                            </Button.Group>
                        </Container>
                    </Grid.Column>

                    {this.renderTransactions()}

                    <AccountData
                        open={this.state.accountDialog}
                        onClose={this.handleCloseAccountDialog}
                        accountData={this.state.accountData}
                        onChange={this.handleChangeAccountData}
                        onSave={this.handleSaveAccount}
                    />

                    <TransactionData
                        open={this.state.transactionDialog}
                        onChange={this.handleChangeTransactionData}
                        onClose={this.handleCloseTransactionDialog}
                        transactionData={this.state.transactionData}
                        onSave={this.handleSaveTransaction}
                    />
                </Grid>

                {this.renderDeleteAccountWarning()}
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

    renderDeleteAccountWarning() {
        const { accountToDelete } = this.state;
        const { dispatch, history } = this.props;

        const handleCancel = () =>
            this.setState({
                accountToDelete: '',
            });

        const handleDelete = () => {
            if (dispatch) {
                dispatch(accountActions.remove(accountToDelete));
            }

            this.setState({
                accountToDelete: '',
            });

            history.push('/accounts/index');
        };

        return (
            <Modal
                open={accountToDelete !== ''}
                size="tiny"
                basic={true}
                onClose={handleCancel}
            >
                <Modal.Header>Delete Account?</Modal.Header>
                <Modal.Content>
                    Are you sure you want to delete this account?
                </Modal.Content>
                <Modal.Actions>
                    <Button basic={true} onClick={handleCancel} inverted={true}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    renderZeroAccountResult() {
        if (!this.props.accounts.results.length)
            return <Menu.Item>No Accounts</Menu.Item>;

        return null;
    }

    renderZeroTransactionResults() {
        return <p>No Transactions</p>;
    }

    renderTransactions() {
        const { accounts } = this.props;

        if (accounts.results.length === 0) return;

        return (
            <Grid.Column mobile={16} tablet={11} computer={11}>
                <Header sub={true}>Transactions</Header>
                <Segment>{this.renderZeroTransactionResults()}</Segment>

                <Container textAlign="right">
                    <Button.Group basic={true}>
                        <ActionButton
                            show={true}
                            onClick={this.handleOpenCreateTransactionDialog}
                            iconName="plus"
                        />
                    </Button.Group>
                </Container>
            </Grid.Column>
        );
    }

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

    handleChangeTransactionData = (
        e: any,
        props: { type: 'string' | 'number'; name: string; value: string }
    ) => {
        const { name, value, type } = props;

        this.setState({
            transactionData: {
                ...this.state.transactionData,
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

    handleOpenCreateTransactionDialog = () => {
        const { match } = this.props;
        this.setState({
            transactionDialog: true,
            transactionData: {
                ...emptyTransaction,
                accountId: match.params.id,
            },
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

    handleCloseTransactionDialog = (e: React.SyntheticEvent<any>) => {
        this.setState({
            transactionDialog: false,
            transactionData: emptyTransaction,
        });
    };

    handleSaveAccount = () => {
        const { accountData } = this.state;
        const { history } = this.props;
        const dispatch = this.props.dispatch;
        const shouldCreate = !accountData.id;

        if (shouldCreate) {
            if (dispatch) {
                const id = v4();

                dispatch(
                    accountActions.create({
                        ...accountData,
                        id,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    })
                );

                history.push(`/accounts/${id}`);
            }
        } else {
            if (dispatch) {
                dispatch(
                    accountActions.update({
                        ...accountData,
                        updatedAt: new Date().toISOString(),
                    })
                );
            }
        }

        this.setState({
            accountData: emptyAccount,
            accountDialog: false,
        });
    };

    handleSaveTransaction = () => {};
}

const mapState = (state: Store): MapStateProps => ({
    accounts: {
        results: accountSelectors.makeSortedResults(state)('createdAt'),
        entities: accountSelectors.getEntities(state),
    },
    transactions: {
        results: taSelectors.makeGetSortedResults(state)('date'),
        entities: taSelectors.getEntities(state),
    },
});

export default connect(mapState)(Accounts);
