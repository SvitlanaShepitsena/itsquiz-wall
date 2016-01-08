import React, {Component, PropTypes} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as articleActions from '../../actions/article';

import MainLayout from '../../components/layouts/MainLayout.jsx';

import {footerLinks} from '../../config';

class MainLayoutContainer extends Component {
    state = {
        isWelcomeScreenShown: false
    };

    componentDidMount() {
        const skipWelcomeScreen = localStorage.getItem('skipWelcomeScreen');
        const { skipWelcomeDialog } = this.props.location.query;

        if (!skipWelcomeScreen && !skipWelcomeDialog) {
            this.setState({isWelcomeScreenShown: true});
        }
    }

    handleWelcomeScreenDismiss = (needToSkip) => {
        this.setState({isWelcomeScreenShown: false});

        if (needToSkip) {
            localStorage.setItem('skipWelcomeScreen', 'true');
        }
    };

    render() {
        const { isWelcomeScreenShown } = this.state;
        const isEmbedded = this.props.location.query.embed;

        return (
            <MainLayout
                showWelcomeScreen={!isEmbedded && isWelcomeScreenShown}
                onWelcomeScreenDismiss={this.handleWelcomeScreenDismiss}
                showFooter={!isEmbedded}>
                {this.props.children}
            </MainLayout>
        );
    }
}



function mapStateToProps(state) {
    return state.article;

}
/* Binds actions to the store dispatch methods,
 so dumb component can react on user actions and dispatch them */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(articleActions, dispatch);
}
MainLayoutContainer.need=[
    articleActions.articlesGet
]
export default connect(mapStateToProps, mapDispatchToProps)(MainLayoutContainer );
