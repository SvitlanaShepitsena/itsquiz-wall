import React, { Component, PropTypes } from 'react';
import cx                              from 'classnames';

if (process.env.BROWSER) {
    require('./QuizCard.less');
}

import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import Button                           from 'react-mdl/lib/Button';
import IconButton                       from 'react-mdl/lib/IconButton';
import Icon                             from 'react-mdl/lib/Icon';

import { sprintf } from '../utils';

export default class QuizCard extends Component {
    static contextTypes = {i18n: PropTypes.object};

    static propTypes = {
        name: PropTypes.string
    };
    render() {
        const {
            name
            } = this.props;
        const { l, ngettext, humanizeDuration } = this.context.i18n;

        const classes = cx('QuizCard', {
            'QuizCard--sponsored': true
        });

        return (
            <Card className={classes} shadow={1}>
                <CardTitle className='QuizCard__head'>
                    {name}
                </CardTitle>


                <div className='QuizCard__content'>
                    {this.props.children}

                </div>

            </Card>
        );
    }
}
