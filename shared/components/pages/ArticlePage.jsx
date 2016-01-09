import React from 'react';
import cx    from 'classnames';

import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import Grid, { Cell }                   from 'react-mdl/lib/Grid';
import Button                           from 'react-mdl/lib/Button';
import IconButton                       from 'react-mdl/lib/IconButton';
import Spinner                          from 'react-mdl/lib/Spinner';

import Icon                 from '../Icon.jsx';
import LoginDialog          from '../../containers/LoginDialog.jsx';
import AppBarWithBackground from '../AppBarWithBackground.jsx';

import { sprintf } from '../../utils';

if (process.env.BROWSER) {
    require('./ArticlePage.less');
}

export default class ArticlePage extends React.Component {
    static contextTypes = {i18n: React.PropTypes.object};

    static propTypes = {
        article: React.PropTypes.object,
        onPass: React.PropTypes.func,
        onArticleClick: React.PropTypes.func
    };

    renderContent = () => {
        const {
            article,
            authorArticles,
            isLoading,
            onPass,
            onShare,
            onShareResult,
            onStopSharing,
            onSponsoredClick,
            onArticleClick,
            onViewAnswers
            } = this.props;

        const {
            pictureURL,
            name,
            isPrivate,
            userQuizSession,
            numberOfQuestions,
            timeToPass,
            author,
            isSponsored
            } = article;

        const {l, ngettext, humanizeDuration} = this.context.i18n;

        if (isLoading) {
            return <Spinner className='ArticlePage__spinner'/>;
        }

        return (
            <div className='ArticlePage__article'>
                <Card className='ArticlePage__paper' shadow={1}>
                    <div className='ArticlePage__details'>
                        <p className='ArticlePage__message'>
                            At vero eos et accusamus et iusto odio dignissimos ducimus
                        </p>
                    </div>
                </Card>


                <Grid className='ArticlePage__author-articles-grid'>
                    {
                        authorArticles.map((authorArticle, i) =>
                            <Cell
                                key={authorArticle.id}
                                align='stretch'
                                col={3}
                                phone={2}
                                tablet={3}>
                            </Cell>
                        )
                    }
                </Grid>
            </div>
        );
    }

    render() {
        const { l } = this.context.i18n;
        const {
            article,
            sharingLink,
            isLoading,
            isLoggingIn,
            isEmbedded,
            userQuizSession,
            onShare,
            onLoginDialogClose,
            onStopSharing,
            onGoBack
            } = this.props;

        const classes = cx('ArticlePage', {
            'ArticlePage--loading': isLoading,
        });

        console.log(userQuizSession);

        return (
            <div className={classes}>
                <LoginDialog
                    isOpen={isLoggingIn}
                    onRequestClose={onLoginDialogClose}
                />

                <div className='ArticlePage__content'>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

    getGreetingPhrase = (grade) => {
        const { l } = this.context.i18n;

        const phrases = {
            'verybad': l('You could do better!'),
            'bad': l('You could do better!'),
            'normal': l('Good job!'),
            'good': l('Great result!'),
            'excellent': l('You rock! Excellent job!')
        };

        return phrases[grade];
    }
}
