import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

interface Props extends RouteComponentProps<any> {}

class App extends React.Component<Props> {
    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <Menu pointing={true} size="massive" stackable={true}>
                    <Menu.Item
                        name="accounts"
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
