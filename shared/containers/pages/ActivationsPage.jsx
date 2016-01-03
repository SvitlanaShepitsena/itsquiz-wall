'use strict';

import React, {Component, PropTypes} from 'react';
import { connect }                   from 'react-redux';
import strformat                     from 'strformat';

import { loadActivations, searchActivations } from '../../actions/activations';
import connectDataFetchers                    from '../../lib/connectDataFetchers.jsx';
import EmbedEvents                            from '../../utils/EmbedEventsUtil';
import config                                 from '../../config';
import { sendEvent }                          from '../../utils/googleAnalytics';

import ActivationsPage from '../../components/pages/ActivationsPage.jsx';

const embedEvents = new EmbedEvents({
    embedOrigin: config.embedOrigin
});

class ActivationsPageContainer extends Component {
    static contextTypes = { i18n: PropTypes.object };

    state = {
        linkToShare : '',
        isSharing   : false
    };

    handleQuizCardClick = (activation) => {
        this.props.history.pushState(null, `/activations/${activation.id}`, {
            embed : this.props.location.query.embed,
            assigneeId : this.props.location.query.assigneeId
        });

        sendEvent('activation card', 'view details');
    };

    handleSearch = (searchText) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            search : searchText || undefined
        });

        sendEvent('activations page', 'search');
    };

    handleShare = (activation) => {
        this.setState({
            linkToShare : activation.publicLink,
            isSharing   : true
        });

        sendEvent('activation card', 'share');
    };

    handleTabChange = (category) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            category : category !== 'ALL' ? category : undefined
        });

        sendEvent('activatios page', 'category', category);
    };

    handleStopSharing = () => {
        this.setState({
            linkToShare : '',
            isSharing   : false
        });
    };

    componentDidMount() {
        embedEvents.subscribe({
            'SEARCH_QUIZ_WALL' : this.handleSearch
        });
    }

    componentWillReceiveProps(nextProps) {
        const currentQuery = this.props.location.query;
        const nextQuery = nextProps.location.query;

        const needToReloadData = currentQuery.search !== nextQuery.search
            || currentQuery.category !== nextQuery.category;

        if (needToReloadData) {
            this.props.dispatch( loadActivations(nextProps.params, nextQuery) );
        }
    }

    componentWillUnmount() {
        embedEvents.unsubscribe();
    }

    render() {
        return (
            <ActivationsPage
                activations      = {this.props.activations}
                search           = {this.props.search}
                linkToShare      = {this.state.linkToShare}
                selectedCategory = {this.props.category}
                isSharing        = {this.state.isSharing}
                isEmbedded       = {this.props.location.query.embed}
                isLoading        = {this.props.isLoading}
                isEmpty          = {this.props.activations.length === 0}
                onItemClick      = {this.handleQuizCardClick}
                onSearch         = {this.handleSearch}
                onShare          = {this.handleShare}
                onTabChange      = {this.handleTabChange}
                onStopSharing    = {this.handleStopSharing}
            />
        );
    }
}

function mapStateToProps({ activations: {activations, isLoading} }) {
    return {
        activations,
        isLoading
    };
}

export default connect(mapStateToProps)(
    connectDataFetchers(ActivationsPageContainer, [ loadActivations ])
);

