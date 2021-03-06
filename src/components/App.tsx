import * as React from 'react';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';

// Semantic UI
import { Menu } from 'semantic-ui-react';

// Pages
import Accounts from './pages/Accounts';

import './App.css';

interface Props extends RouteComponentProps<any> {}

class App extends React.Component<Props> {
    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <Menu
                    stackable={true}
                    inverted={true}
                    size="huge"
                    className="App__menu"
                >
                    <Menu.Item header={true}>Inspector Budget</Menu.Item>
                    <Menu.Item
                        name="accounts/index"
                        onClick={this.handleMenuClick}
                        active={location.pathname.indexOf('/accounts') > -1}
                    >
                        Accounts
                    </Menu.Item>
                    <Menu.Item
                        name="budgets"
                        onClick={this.handleMenuClick}
                        active={location.pathname.indexOf('/budgets') > -1}
                    >
                        Budgets
                    </Menu.Item>
                </Menu>

                <Route path="/accounts/:id" component={Accounts} />
            </React.Fragment>
        );
    }

    handleMenuClick = (
        e: React.SyntheticEvent<HTMLAnchorElement>,
        props: { name: string }
    ) => {
        this.props.history.push(`/${props.name}`);
    };
}

export default withRouter(App);
