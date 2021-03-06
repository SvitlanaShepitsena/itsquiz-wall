import React from 'react';
import cx    from 'classnames';

import { Tab, Tabs }  from 'react-mdl/lib/Tabs';
import Grid, { Cell } from 'react-mdl/lib/Grid';
import Spinner        from 'react-mdl/lib/Spinner';

import QuizCard    from '../QuizCard.jsx';
import AppBar      from '../AppBar.jsx';
import ShareDialog from '../../containers/ShareDialog.jsx';

if (process.env.BROWSER) {
    require('./ArticlesPage.less');
}

const CATEGORIES = ['ALL', 'ANGULAR', 'REACT', 'REDUX'];

export default class ArticlesPage extends React.Component {
    static contextTypes = {i18n: React.PropTypes.object};

    static propTypes = {
        articles: React.PropTypes.arrayOf(React.PropTypes.object),
        search: React.PropTypes.string,
        onItemClick: React.PropTypes.func,
        onShare: React.PropTypes.func,
        onSearch: React.PropTypes.func
    };

    renderContent = () => {
        const { l } = this.context.i18n;
        const { articles, search, isLoading, isEmpty, onItemClick, onShare } = this.props;

        if (isLoading) {
            return <Spinner className='ArticlesPage__spinner'/>;
        }

        if (isEmpty && search) {
            return (
                <div className='ArticlesPage__empty-state'>
                    {l('Sorry, we couldn\'t find any tests for ')} <strong> {search} </strong>
                </div>
            );
        }

        if (isEmpty) {
            return (
                <div className='ArticlesPage__empty-state'>
                    {l('There are no articles in this category yet')}
                </div>
            );
        }

        return (
            <Grid className='ArticlesPage__list'>
                {articles.map(article =>
                    <Cell
                        key={article.youtubeId}
                        align='top'
                        col={3}
                        tablet={4}
                        phone={12}>
                        <QuizCard>{article.title}</QuizCard>
                    </Cell>
                )}
            </Grid>
        );
    };

    render() {
        const {
            search,
            selectedCategory,
            isSharing,
            isEmbedded,
            isLoading,
            linkToShare,
            onSearch,
            onTabChange,
            onStopSharing
            } = this.props;

        const { l } = this.context.i18n;

        const classes = cx('ArticlesPage', {
            'ArticlesPage--embedded': isEmbedded,
            'ArticlesPage--loading': isLoading
        });

        return (
            <div className={classes}>
                <ShareDialog
                    title={l('Share this test')}
                    isOpen={isSharing}
                    linkToShare={linkToShare}
                    onRequestClose={onStopSharing}
                />

                <div className='ArticlesPage__header'>
                    <AppBar
                        title={l('Chicago Wep App')}
                        search={search}
                        className='ArticlesPage__app-bar'
                        fixOnScroll={false}
                        scrollOffset={65}
                        displaySearch={true}
                        onSearch={onSearch}
                    />

                    <div className='ArticlesPage__tab-bar'>
                        <Tabs
                            ripple={true}
                            activeTab={selectedCategory ? CATEGORIES.indexOf(selectedCategory) : 0}
                            className='ArticlesPage__tabs'
                            onChange={(index) => onTabChange(CATEGORIES[index])}>
                            <Tab>{l('All Tutorials')}</Tab>
                            <Tab>{l('Angular')}</Tab>
                            <Tab>{l('React')}</Tab>
                            <Tab>{l('Redux')}</Tab>
                        </Tabs>
                    </div>
                </div>

                <div className='ArticlesPage__content'>
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}
