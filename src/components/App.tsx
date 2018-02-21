import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

class App extends React.Component<any> {
    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <Menu pointing={true} size="massive" stackable={true}>
                    <Menu.Item
                        name="accounts"
                        onClick={this.handleMenuClick}
                        active={location.pathname === '/accounts'}
                    >
                        Accounts
                    </Menu.Item>
                    <Menu.Item
                        name="budgets"
                        onClick={this.handleMenuClick}
                        active={location.pathname === '/budgets'}
                    >
                        Budgets
                    </Menu.Item>
                </Menu>
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
