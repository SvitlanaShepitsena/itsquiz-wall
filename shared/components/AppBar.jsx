'use strict';

import React, { Component, PropTypes } from 'react';
import cx                              from 'classnames';

import SearchBox      from './SearchBox.jsx';
import LanguageSwitch from '../containers/LanguageSwitch.jsx';
import LoginDialog    from '../containers/LoginDialog.jsx';
import {connect} from 'react-redux';
import User from '../components/common/User';

import IconButton from 'react-mdl/lib/IconButton';

if (process.env.BROWSER) {
    require('./AppBar.less');
}

const LOGO_SRC = './static/logo.svg';

class AppBar extends Component {
    static contextTypes = {i18n: PropTypes.object};

    static propTypes = {
        title: PropTypes.string,
        search: PropTypes.string,
        displayRightMenu: PropTypes.bool,
        displaySearch: PropTypes.bool,
        rightIconName: PropTypes.string,
        fixOnScroll: PropTypes.bool,
        scrollOffset: PropTypes.number,
        onRightIconClick: PropTypes.func,
        onSearch: PropTypes.func
    };

    static defaultProps = {
        title: '',
        search: '',
        fixOnScroll: true,
        displaySearch: false,
        displayRightMenu: true,
        rightIconName: '',
        scrollOffset: 0
    };

    state = {
        isFixedToTop: false,
        isLoggingIn: false
    };

    handleScroll = () => {
        const scrollTop = (window.pageYOffset !== undefined)
            ? window.pageYOffset
            : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        const isFixedToTop = scrollTop > this.props.scrollOffset;

        if (isFixedToTop !== this.state.isFixedToTop) {
            this.setState({isFixedToTop});
        }
    };

    handleLogin = () => {
        this.setState({
            isLoggingIn: true
        });
    };

    handleLoginDialogClose = () => {
        this.setState({
            isLoggingIn: false
        });
    };

    componentDidMount() {
        if (this.props.fixOnScroll) {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    componentWillUnmount() {
        if (this.props.fixOnScroll) {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }

    render() {
        const user = this.props.user ? this.props.user.profile : null;
        const {
            title,
            search,
            displaySearch,
            displayRightMenu,
            rightIconName,
            onRightIconClick,
            onSearch
            } = this.props;

        const { l } = this.context.i18n;

        const { isLoggingIn, isFixedToTop } = this.state;

        const rootClassNames = cx('AppBar', this.props.className, {
            'AppBar--fixed': isFixedToTop,
            'AppBar--with-search': displaySearch
        });

        return (
            <div className={rootClassNames}>

                <LoginDialog
                    isOpen={isLoggingIn}
                    onRequestClose={this.handleLoginDialogClose}
                />

                <div className='AppBar__left'>
                    {
                        rightIconName
                            ? <IconButton name={rightIconName} onClick={onRightIconClick}/>
                            : <img width='70px' height='70px' src={LOGO_SRC} className='AppBar__logo'/>
                    }

                    <h2 className='AppBar__title'> {title} </h2>
                </div>
                {
                    displaySearch
                        ? (
                        <div className='AppBar__center'>
                        </div>
                    )
                        : null
                }

                {
                    displayRightMenu
                        ? <div className='AppBar__right'>
                        <LanguageSwitch className='AppBar__lang'/>
                        <div className='AppBar__menu-item' >
                            {user && <User user={user}/>}
                            {!user && <div onClick={this.handleLogin}>{l('Sign up / Sign in')}</div>}
                        </div>
                    </div>
                        : null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user

    };
}

export default connect(mapStateToProps)(AppBar);

