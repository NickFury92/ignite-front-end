import React, {Fragment} from "react";
import {inject} from "mobx-react";
import {AppBar as MuiAppBar, makeStyles, Toolbar} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import {AppBarLink} from "./AppBarLink";
import {UserAppBarMenu} from "./UserAppBarMenu";
import {AppBarSearchTextField} from "./AppBarSearchTextField";
import {Routes} from "../../routes";

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
        border: "none"
    }
}));

const _AppBar = ({currentActiveRoute, routerStore}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <MuiAppBar variant="outlined"
                       className="app-bar"
                       position="fixed"
            >
            <div className="header-logo"></div>
                <Toolbar className="tool-bar">
                    <div style={{flexGrow: 1}}>
                        <AppBarLink text="Home"
                                    targetView={Routes.home}
                                    active={currentActiveRoute === "home"}
                                    icon={<HomeIcon/>}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                    </div>
                    <AppBarSearchTextField/>
                    <UserAppBarMenu/>
                </Toolbar>
            </MuiAppBar>
            <Toolbar/>
        </Fragment>
    )
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const AppBar = inject(mapMobxToProps)(_AppBar);
