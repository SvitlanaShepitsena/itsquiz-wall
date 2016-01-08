'use strict';

import React, {Component, PropTypes} from 'react';
import { connect }                   from 'react-redux';

import { loadArticle }  from '../../actions/article';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { sendEvent }       from '../../utils/googleAnalytics';

class ShareResultPageContainer extends Component {
    componentDidMount() {
        const { id, userId } = this.props.params;
        const { article } = this.props;

        if (article.isPrivate) {
            this.props.history.replaceState(null, `/articles`, {
                ...this.props.location.query
            });
        } else {
            this.props.history.replaceState(null, `/articles/${id}`, {
                ...this.props.location.query
            });
        }
    }

    render() {
        return (
            <div />
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
    connectDataFetchers(ShareResultPageContainer, [loadArticle])
);
