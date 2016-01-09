'use strict';

import React, {Component, PropTypes} from 'react';
import { connect }                   from 'react-redux';
import strformat                     from 'strformat';

import { loadArticle }  from '../../actions/articles';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import EmbedEvents         from '../../utils/EmbedEventsUtil';
import config              from '../../config';
import { sendEvent }       from '../../utils/googleAnalytics';

import ArticlePage from '../../components/pages/ArticlePage.jsx';

const embedEvents = new EmbedEvents({
    embedOrigin: config.embedOrigin
});

class ArticlePageContainer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        sharingLink: '',
        isLoggingIn: false
    };

    componentWillMount() {
        const { id, userId } = this.props.params;

        if (userId) {
            this.props.history.replaceState(null, `/articles/${id}`);
        }
    }

    handlePassArticleClick = (article) => {
        const isEmbedded = this.props.location.query.embed;
        const { actionId, isSponsored } = article;

        if (isEmbedded) {
            embedEvents.send({
                type: 'PASS_TEST',
                actionId
            });
        } else {
            this.setState({isLoggingIn: true});
        }

        if (isSponsored) {
            sendEvent('sponsored article', 'pass click');
        } else {
            sendEvent('article', 'pass');
        }
    };

    handleViewAnswers = (article) => {
        const isEmbedded = this.props.location.query.embed;

        if (isEmbedded && article.isPassed) {
            const quizSessionId = article.userQuizSession.id;

            embedEvents.send({
                type: 'VIEW_ANSWERS',
                quizSessionId
            });
        }
    };

    handleSponsoredClick = (article) => {
        const isEmbedded = this.props.location.query.embed;
        const { id } = article;

        if (isEmbedded) {
            embedEvents.send({
                type: 'COURSE_REQUEST',
                articleId: id
            });
        } else {
            this.setState({isLoggingIn: true});
            this.props.history.pushState(null, this.props.location.pathname, {
                requestArticleId: id
            });
        }

        sendEvent('sponsored article', 'request click');
    };

    handleGoBack = () => {
        this.props.history.pushState(null, `/articles`, {
            embed: this.props.location.query.embed,
            assigneeId: this.props.location.query.assigneeId
        });
    };

    handleArticleClick = (article) => {
        this.props.history.pushState(null, `/articles/${article.id}`, {
            embed: this.props.location.query.embed,
            assigneeId: this.props.location.query.assigneeId
        });

        sendEvent('article', 'author articles', 'click');
    };

    handleShare = (article) => {
        this.setState({
            sharingLink: article.publicLink
        });

        sendEvent('article', 'share', 'click');
    };

    handleShareResult = (article) => {
        this.setState({
            sharingLink: article.userQuizSession.shareResultLink
        });

        sendEvent('article', 'share result', 'click');
    };

    handleStopSharing = () => {
        this.setState({
            sharingLink: ''
        });
    };

    handleLoginClose = () => {
        this.setState({
            isLoggingIn: false
        });
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.dispatch(loadArticle(nextProps.params, nextProps.location.query));
        }
    }

    render() {
        const { article, authorArticles, isLoading } = this.props;
        const { sharingLink, isLoggingIn } = this.state;
        const { embed, assigneeId } = this.props.location.query;

        return (
            <ArticlePage
                article={article}
                authorArticles={authorArticles}
                sharingLink={sharingLink}
                isLoading={isLoading}
                isEmbedded={embed}
                isLoggingIn={isLoggingIn}
                showUserResult={article.isPassed && assigneeId}

                onPass={this.handlePassArticleClick}
                onSponsoredClick={this.handleSponsoredClick}
                onViewAnswers={this.handleViewAnswers}
                onArticleClick={this.handleArticleClick}
                onGoBack={this.handleGoBack}
                onShare={this.handleShare}
                onShareResult={this.handleShareResult}
                onStopSharing={this.handleStopSharing}
                onLoginDialogClose={this.handleLoginClose}
            />
        );
    }
}

function mapStateToProps({ currentArticle: {article, authorArticles, isLoading} }) {
    return {
        article,
        authorArticles,
        isLoading
    };
}

export default connect(mapStateToProps)(
    connectDataFetchers(ArticlePageContainer, [loadArticle])
);
