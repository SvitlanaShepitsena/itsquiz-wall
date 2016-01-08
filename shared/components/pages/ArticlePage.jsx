import React from 'react';
import cx    from 'classnames';

import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import Grid, { Cell }                   from 'react-mdl/lib/Grid';
import Button                           from 'react-mdl/lib/Button';
import IconButton                       from 'react-mdl/lib/IconButton';
import Spinner                          from 'react-mdl/lib/Spinner';

import QuizTile             from '../QuizTile.jsx';
import Icon                 from '../Icon.jsx';
import ShareDialog          from '../../containers/ShareDialog.jsx';
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
            showUserResult,
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

        const classes = cx('ArticlePage__article', {
            'ArticlePage__article--sponsored': isSponsored,
            'ArticlePage__article--passed': showUserResult
        });

        return (
            <div className='ArticlePage__article'>
                <Card className='ArticlePage__paper' shadow={1}>
                    <CardTitle className='ArticlePage__head'>
                        <img className='ArticlePage__picture' src={pictureURL}/>
                        <div className='ArticlePage__info'>
                            <div className='ArticlePage__heading'>
                                <span className='ArticlePage__name'>{name}</span>
                                {
                                    isPrivate
                                        ? <span className='ArticlePage__private-tag'>
                                        <Icon type='lock' className='ArticlePage__lock'/>
                                        {l('private')}
                                    </span>
                                        : null
                                }
                            </div>

                            <div className='ArticlePage__author-name'>
                                {author.fullName}
                            </div>

                            <div className='ArticlePage__pass-info'>
                                <span className='ArticlePage__number-of-questions'>
                                    {
                                        sprintf(
                                            ngettext('%d question', '%d questions', numberOfQuestions),
                                            numberOfQuestions
                                        )
                                    }
                                </span>

                                <span className='ArticlePage__span-divider'>
                                    •
                                </span>

                                <span className='ArticlePage__time-to-pass'>
                                    { humanizeDuration(timeToPass, 'second') }
                                </span>
                            </div>
                            <div className='ArticlePage__actions'>
                                {
                                    !showUserResult
                                        ? <Button
                                        ripple={true}
                                        raised={!isSponsored}
                                        onClick={onPass.bind(null, article)}
                                        className='ArticlePage__pass-btn'>
                                        {l('Pass the test')}
                                    </Button>
                                        : null
                                }

                                {
                                    isSponsored
                                        ? <Button
                                        colored={true}
                                        ripple={true}
                                        onClick={onSponsoredClick.bind(null, article)}
                                        className='ArticlePage__pass-btn ArticlePage__offer-btn'
                                        raised={true}>
                                        {l('Use this offer')}
                                    </Button>
                                        : null
                                }
                            </div>
                        </div>

                        <div className='ArticlePage__menu'>
                            {
                                !article.isPrivate
                                    ? <IconButton
                                    name='share'
                                    ripple={true}
                                    onClick={onShare.bind(null, article)}
                                />
                                    : null
                            }
                        </div>
                    </CardTitle>

                    {
                        showUserResult
                            ? <div className={'ArticlePage__results-container ' + userQuizSession.grade}>
                            <div className='ArticlePage__overlay'>
                                <div className='ArticlePage__results-text'>
                                    <h4 className='ArticlePage__greeting'>
                                        {this.getGreetingPhrase(userQuizSession.grade)}
                                    </h4>
                                    <div className='ArticlePage__score'>
                                        {userQuizSession.score}%
                                    </div>
                                    <div className='ArticlePage__points'>
                                        ({
                                        sprintf(
                                            ngettext(
                                                '%s of %s point',
                                                '%s of %s points',
                                                userQuizSession.maxPoints
                                            ),
                                            userQuizSession.gainedPoints,
                                            userQuizSession.maxPoints
                                        )
                                    })
                                    </div>
                                </div>
                                <div className='ArticlePage__results-actions'>
                                    <Button
                                        ripple={true}
                                        onClick={onShareResult.bind(null, article)}
                                        className='ArticlePage__result-share-btn'
                                        raised={true}>
                                        {l('Share result with friends')}
                                    </Button>

                                    {
                                        userQuizSession.canViewAnswers
                                            ? <Button
                                            ripple={true}
                                            onClick={onViewAnswers.bind(null, article)}
                                            className='ArticlePage__result-answers-btn'>
                                            {l('View my answers')}
                                        </Button>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                            : null
                    }

                    <div className='ArticlePage__details'>
                        <p className='ArticlePage__message'>
                            {article.message}
                        </p>
                    </div>
                </Card>

                {
                    authorArticles.length !== 0
                        ? <div className='ArticlePage__subheader'>
                        {sprintf(l('More tests by %s'), article.author.fullName)}
                    </div>
                        : null
                }

                <Grid className='ArticlePage__author-articles-grid'>
                    {
                        authorArticles.map((authorArticle, i) =>
                            <Cell
                                key={authorArticle.id}
                                align='stretch'
                                col={3}
                                phone={2}
                                tablet={3}>
                                <QuizTile
                                    id={authorArticle.id}
                                    name={authorArticle.name}
                                    timeToPass={authorArticle.timeToPass}
                                    numberOfQuestions={authorArticle.numberOfQuestions}
                                    pictureURL={authorArticle.pictureURL}
                                    author={article.author}
                                    isPassed={showUserResult && authorArticle.isPassed}
                                    userQuizSession={authorArticle.userQuizSession}
                                    onClick={onArticleClick.bind(null, authorArticle)}
                                />
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
            showUserResult,
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
            'ArticlePage--embedded': isEmbedded
        });

        console.log(showUserResult, userQuizSession);

        return (
            <div className={classes}>
                <ShareDialog
                    title={l('Share')}
                    isOpen={!!sharingLink}
                    twitterMessage={showUserResult
                        ? sprintf(l('My result is %d%%'), article.userQuizSession.score)
                        : l('Check out this test')
                    }
                    linkToShare={sharingLink}
                    onRequestClose={onStopSharing}
                />

                <LoginDialog
                    isOpen={isLoggingIn}
                    onRequestClose={onLoginDialogClose}
                />

                <AppBarWithBackground
                    backgroundURL={article.backgroundURL}
                    displayRightMenu={!isEmbedded}
                    rightIconName='arrow_back'
                    onRightIconClick={onGoBack}
                    title={article.name}
                    height={200}
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
