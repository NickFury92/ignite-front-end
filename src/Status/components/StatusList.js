import React, {Fragment, useEffect} from "react";
import {StatusListItem} from "./StatusListItem";

export const StatusList = ({
    statuses,
    onFavouriteClick,
    pending,
    hasNewStatuses,
    onShowNewStatusesClick,
    statusLikePendingMap,
    currentUser,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    onNextPageRequest
}) => {
    let trackScrolling = () => {
        const element = document.getElementById("statusList");

        if (element.getBoundingClientRect().bottom <= window.innerHeight) {
            onNextPageRequest();
        }
    };


    useEffect(() =>{
        document.addEventListener("scroll", trackScrolling);

        return () => document.removeEventListener("scroll", trackScrolling);
    });

    return (
        <div id="statusList" className="status-list-card paddingBottomRoot">
            {statuses.map(status => (
                <Fragment key={status.id}>
                    <StatusListItem status={status}
                                    onFavouriteStatusChange={onFavouriteClick}
                                    onFollowRequest={onFollowRequest}
                                    onUnfollowRequest={onUnfollowRequest}
                                    displayMenu={displayMenu}
                                    currentUserIsAuthor={currentUser && currentUser.id === status.account.id}
                                    statusLikePending={statusLikePendingMap[status.id]}
                                    link
                    />
                </Fragment>
            ))}
        </div>
    );
};
