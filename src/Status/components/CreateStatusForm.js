import React from "react";
import {inject, observer} from "mobx-react";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {AttachImageInput} from "./AttachImageInput";
import {CreateStatusFormMediaAttachments} from "./CreateStatusFormMediaAttachments";
import {RepostedStatusContent} from "./RepostedStatusContent";
import {localized} from "../../localization/components";
import {RepostedCommentContent} from "./RepostedCommentContent";

const useStyles = makeStyles(theme => ({
    createStatusFormCard: {
        background: "#F1EBE8"
    },
    remainingCharactersCounter: {
        background: "#FBF7F6",
        justifyContent: "space-between",
        padding: "7px 10px"
    },
    createStatusButtonWrapper: {
        paddingTop: 15
    },
    createStatusButton: {
        borderRadius: 30,
        float: "right",
        width: "114px",
    },
    mediaAttachmentsContainer: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const getDisabledLabelForAttachmentsInput = (maxAttachments, l) => {
    const maxAttachmentsString = `${maxAttachments}`;
    const isPlural = maxAttachmentsString.charAt(maxAttachmentsString.length - 1) !== "1";
    const bindings = {limit: 1};
    const labelKey = isPlural ? "status.images-attachments-limit.plural" : "status.images-attachments-limit";

    return l(labelKey, bindings);
};

const _CreateStatusForm = ({
    charactersRemaining,
    submissionError,
    content,
    pending,
    currentUserAvatar,
    setContent,
    createStatus,
    mediaAttachmentsFiles,
    addMediaAttachments,
    removeMediaAttachment,
    uploadedAttachments,
    hideSendButton = false,
    repostedStatus,
    setRepostedStatus,
    repostedComment,
    setRepostedComment,
    l
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.createStatusFormCard} className="create-status-form">
            <Grid container style={{
                padding: "25px 15px 25px 15px"
            }}>
                {repostedStatus && (
                    <Grid item xs={12}>
                        <Typography>
                            {l("status.reposted-status")}:
                        </Typography>
                        <RepostedStatusContent repostedStatus={repostedStatus}
                                               displayClearButton
                                               onClearButtonClick={() => setRepostedStatus(undefined)}
                        />
                    </Grid>
                )}
                {repostedComment && (
                    <Grid item xs={12}>
                        <Typography>
                            {l("status.reposted-comment")}:
                        </Typography>
                        <RepostedCommentContent comment={repostedComment}
                                                displayClearButton
                                                onClearButtonClick={() => setRepostedComment(undefined)}
                        />
                    </Grid>
                )}
                <Grid item xs={1}>
                    <Avatar src={currentUserAvatar} className="avatar-mini"/>
                </Grid>
                <Grid item xs={11}>
                    <TextField placeholder={l("status.placeholder")}
                               multiline
                               rows="4"
                               onChange={event => setContent(event.target.value)}
                               fullWidth
                               value={content}
                               className="create-status-form-textfield"
                    />
                </Grid>
            </Grid>
            <CardActions style={{display: "flex"}}>
                <Grid container justify="flex-start">
                    <div className="create-status-form-pic">
                        <AttachImageInput onImagesAttached={addMediaAttachments}
                                          disabled={mediaAttachmentsFiles.length === 1}
                                          disabledLabel={getDisabledLabelForAttachmentsInput(1, l)}
                        />
                        <img src="/pic-gif-disabled.png" />
                        <img src="/pic-list-disabled.png" />
                        <img src="/pic-smile-disabled.png" />
                    </div>
                </Grid>
                <Grid container justify="flex-end">
                    <Grid item xs={12} className="create-status-form-counter-container">
                            <div className={classes.remainingCharactersCounter}>
                                <Typography variant="body1"
                                            color="textSecondary"
                                >
                                    {charactersRemaining}
                                </Typography>
                            </div>
                    </Grid>
                    <Grid item xs={12} className="create-status-form-button-container">
                        {!hideSendButton && (
                            <Button variant="contained"
                                    color="primary"
                                    className={classes.createStatusButton}
                                    onClick={createStatus}
                                    disabled={pending || !(content.length > 0 || uploadedAttachments.length !== 0)}
                            >
                                {pending && <CircularProgress size={15}/>}
                                {l("status.send")}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </CardActions>
            <div className={classes.mediaAttachmentsContainer}>
                <CreateStatusFormMediaAttachments mediaAttachmentsFiles={mediaAttachmentsFiles}
                                                  onDelete={removeMediaAttachment}
                />
            </div>
        </Card>
    )
};

const mapMobxToProps = ({createStatus, authorization, uploadMediaAttachments}) => ({
    charactersRemaining: createStatus.charactersRemaining,
    submissionError: createStatus.submissionError,
    content: createStatus.content,
    pending: createStatus.pending,
    currentUserAvatar: authorization.currentUser
        ? authorization.currentUser.avatar || "http://localhost:3000/avatars/original/missing.png"
        : "http://localhost:3000/avatars/original/missing.png",
    setContent: createStatus.setContent,
    createStatus: createStatus.createStatus,
    addMediaAttachments: uploadMediaAttachments.attachFiles,
    removeMediaAttachment: uploadMediaAttachments.removeAttachedFileById,
    mediaAttachmentsFiles: uploadMediaAttachments.mediaAttachmentsFiles,
    uploadedAttachments: createStatus.mediaAttachments,
    repostedStatus: createStatus.repostedStatus,
    setRepostedStatus: createStatus.setRepostedStatus,
    repostedComment: createStatus.repostedComment,
    setRepostedComment: createStatus.setRepostedComment
});

export const CreateStatusForm = localized(inject(mapMobxToProps)(observer(_CreateStatusForm)));
