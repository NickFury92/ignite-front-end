import React, {Fragment} from "react";
import {inject} from "mobx-react";
import {Avatar, CardHeader, List, ListItem, ListItemAvatar, Typography, Hidden} from "@material-ui/core";
import {Link} from "mobx-router";
import {trimString} from "../../utils/string-utils";
import {Routes} from "../../routes";

const _UsersList = ({users, routerStore}) => (
    <List>
        {users.map(user => (
            <ListItem role="div">
                <ListItemAvatar>
                    <Avatar src={user.avatar || "http://localhost:3000/avatars/original/missing.png"}/>
                </ListItemAvatar>
                <CardHeader title={(
                    <Link view={Routes.userProfile}
                          params={{username: user.id}}
                          store={routerStore}
                          style={{
                              color: "inherit"
                          }}
                    >
                        <Hidden xsDown>
                            <Typography>
                                <strong>{user.display_name}</strong>
                            </Typography>
                        </Hidden>
                        <Hidden smUp>
                            <Typography>
                                <strong>{trimString(user.display_name, 28)}</strong>
                            </Typography>
                        </Hidden>
                    </Link>
                )}
                            subheader={
                                <Fragment>
                                    <Hidden xsDown>
                                        {user.username}
                                    </Hidden>
                                    <Hidden smUp>
                                        <strong>{trimString(user.username, 28)}</strong>
                                    </Hidden>
                                </Fragment>
                            }
                />
            </ListItem>
        ))}
    </List>
);

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
