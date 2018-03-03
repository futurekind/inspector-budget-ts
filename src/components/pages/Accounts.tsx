import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Types
import { Account } from '../../types/account';
import { Store } from '../../types/store';

// Sematic UI
import { Container } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';
import { Label } from 'semantic-ui-react';

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
class Accounts extends React.Component<Props> {
    render() {
        const { results } = this.props.accounts;

        return (
            <Container>
                <Grid>
                    <Grid.Column mobile={16} tablet={5}>
                        <Menu pointing={true} vertical={true} fluid={true}>
                            {results.map(this.renderAccountMenuItem)}
                        </Menu>
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={11}>
                        Hallo
                    </Grid.Column>
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
                    {account.balance}
                </Label>
            </Menu.Item>
        );
    };

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
