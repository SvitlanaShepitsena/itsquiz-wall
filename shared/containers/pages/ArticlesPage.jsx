'use strict';

import React, {Component, PropTypes} from 'react';
import { connect }                   from 'react-redux';
import strformat                     from 'strformat';

import { loadArticles, searchArticles } from '../../actions/article';
import connectDataFetchers                    from '../../lib/connectDataFetchers.jsx';
import EmbedEvents                            from '../../utils/EmbedEventsUtil';
import config                                 from '../../config';
import { sendEvent }                          from '../../utils/googleAnalytics';

import ArticlesPage from '../../components/pages/ArticlesPage.jsx';

const embedEvents = new EmbedEvents({
    embedOrigin: config.embedOrigin
});

class ArticlesPageContainer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        linkToShare: '',
        isSharing: false
    };

    handleQuizCardClick = (article) => {
        this.props.history.pushState(null, `/articles/${article.id}`, {
            embed: this.props.location.query.embed,
            assigneeId: this.props.location.query.assigneeId
        });

        sendEvent('article card', 'view details');
    };

    handleSearch = (searchText) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            search: searchText || undefined
        });

        sendEvent('articles page', 'search');
    };

    handleShare = (article) => {
        this.setState({
            linkToShare: article.publicLink,
            isSharing: true
        });

        sendEvent('article card', 'share');
    };

    handleTabChange = (category) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            category: category !== 'ALL' ? category : undefined
        });

        sendEvent('articles page', 'category', category);
    };

    handleStopSharing = () => {
        this.setState({
            linkToShare: '',
            isSharing: false
        });
    };

    componentDidMount() {
        embedEvents.subscribe({
            'SEARCH_QUIZ_WALL': this.handleSearch
        });
    }

    componentWillReceiveProps(nextProps) {
        const currentQuery = this.props.location.query;
        const nextQuery = nextProps.location.query;

        const needToReloadData = currentQuery.search !== nextQuery.search
            || currentQuery.category !== nextQuery.category;

        if (needToReloadData) {
            this.props.dispatch(loadArticles(nextProps.params, nextQuery));
        }
    }

    componentWillUnmount() {
        embedEvents.unsubscribe();
    }

    render() {
        return (
            <ArticlesPage
                articles={this.props.articles}
                search={this.props.search}
                linkToShare={this.state.linkToShare}
                selectedCategory={this.props.category}
                isSharing={this.state.isSharing}
                isEmbedded={this.props.location.query.embed}
                isLoading={this.props.isLoading}
                isEmpty={this.props.articles.length === 0}
                onItemClick={this.handleQuizCardClick}
                onSearch={this.handleSearch}
                onShare={this.handleShare}
                onTabChange={this.handleTabChange}
                onStopSharing={this.handleStopSharing}
            />
        );
    }
}

function mapStateToProps({ articles: {articles, isLoading} }) {
    return {
        articles,
        isLoading
    };
}

export default connect(mapStateToProps)(
    connectDataFetchers(ArticlesPageContainer, [loadArticles])
);

