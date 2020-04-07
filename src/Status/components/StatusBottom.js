import React, {useRef, useState} from "react";
import {
    CardActions,
    Checkbox,
    CircularProgress,
    ClickAwayListener,
    IconButton,
    Popper,
    Typography
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {LetterIcon} from '../../icons/LetterIcon';
import {ShareIcon} from '../../icons/ShareIcon';
import {RepostIcon} from "../../icons/RepostIcon";
import {PenIcon} from "../../icons/PenIcon";
import {AnotherShareIcon} from "../../icons/AnotherShareIcon";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {CommentIcon} from "../../icons/CommentIcon";
import {localized} from "../../localization/components";

const _StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount,
    statusLikePending,
    l
}) => {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = event => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const [open2, setOpen2] = useState(false);
    const anchorRef2 = useRef(null);

    const handleToggle2 = event => {
        setOpen2(prevOpen => !prevOpen);
    };

    const handleClose2 = event => {
        if (event && anchorRef2.current && anchorRef2.current.contains(event.target)) {
            return;
        }

        setOpen2(false);
    };

    return (
        <ClickEventPropagationStopper>
            <CardActions  className="status-list-bottom-container">
                <div className="status-list-bottom-box">
                    <CommentIcon/>
                    <Typography variant="body1" color={"textSecondary"}>
                        0
                    </Typography>
                </div>
                <div className="status-list-bottom-box">
                    <IconButton ref={anchorRef}
                                onClick={handleToggle}
                    >
                        <RepostIcon/>
                    </IconButton>
                    <Typography variant="body1" color={"textSecondary"}>
                        0
                    </Typography>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                        <ClickEventPropagationStopper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div className="status-list-bottom-box-modal" onClick={handleClose}>
                                    <ClickEventPropagationStopper>
                                        <div className="status-modal-box-item" onClick={handleClose}>
                                            <RepostIcon />
                                            <Typography variant="body1" color={"textSecondary"}>
                                                {l("status.repost")}
                                            </Typography>
                                        </div>
                                    </ClickEventPropagationStopper>
                                    <ClickEventPropagationStopper>
                                        <div className="status-modal-box-item" onClick={handleClose}>
                                            <PenIcon/>
                                            <Typography variant="body1" color={"textSecondary"}>
                                                {l("status.repost.with-comment")}
                                            </Typography>
                                        </div>
                                    </ClickEventPropagationStopper>
                                </div>
                            </ClickAwayListener>
                        </ClickEventPropagationStopper>
                    </Popper>
                </div>
                <div className="status-list-bottom-box">
                    {statusLikePending
                        ? <CircularProgress size={20} color="primary"/>
                        : (
                            <ClickEventPropagationStopper>
                                <Checkbox icon={<FavoriteBorderIcon/>}
                                          checkedIcon={<FavoriteIcon color="primary"/>}
                                          checked={favourited}
                                          onChange={() => onFavouriteClick(statusId, !favourited)}
                                />
                            </ClickEventPropagationStopper>
                        )
                    }
                    <Typography variant="body1" color={favourited ? "primary" : "textSecondary"}>
                        {favouritesCount}
                    </Typography>
                </div>
                <ClickEventPropagationStopper className="status-list-bottom-box">
                    <div>
                        <ClickEventPropagationStopper>
                            <IconButton ref={anchorRef2}
                                        onClick={event => {
                                            handleToggle2(event);
                                        }}
                                        disableRipple
                            >
                                <AnotherShareIcon/>
                            </IconButton>
                        </ClickEventPropagationStopper>
                        <Popper open={open2} anchorEl={anchorRef2.current} role={undefined} transition>
                            <ClickAwayListener onClickAway={handleClose2}>
                                <div className="status-list-bottom-box-modal" onClick={handleClose2}>
                                    <div className="status-modal-box-item" onClick={handleClose2}>
                                        <LetterIcon />
                                        <Typography variant="body1" color={"textSecondary"}>
                                            {l("status.send-in-message")}
                                        </Typography>
                                    </div>
                                    <div className="status-modal-box-item" onClick={handleClose2}>
                                        <ShareIcon/>
                                        <Typography variant="body1" color={"textSecondary"}>
                                            {l("status.copy-link")}
                                        </Typography>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Popper>
                    </div>
                </ClickEventPropagationStopper>
            </CardActions>
        </ClickEventPropagationStopper>
    );
};

export const StatusBottom = localized(_StatusBottom);
