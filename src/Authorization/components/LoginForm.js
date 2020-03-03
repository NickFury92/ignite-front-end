import React, {Fragment} from "react";
import {inject, observer} from "mobx-react";
import {TextField, Button, Typography, CircularProgress, Card, CardContent, makeStyles} from "@material-ui/core";
import {SignUpDialog} from "../../SignUp/components";

const useStyles = makeStyles(() => ({
    loginCard: {
        backgroundColor: "#FBF7F6",
    },
    loginButton: {
        maxWidth: 374,
        borderRadius: 30,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        height: "40px",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        color: "##FFFFFF",
        marginTop: "24px"
        
    },
    signUpButton: {
        maxWidth: 374,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        color: "#FF5C01",
        marginTop: "24px"
    }
}));

const Talk = "{Talk}";

const _LoginForm = ({
    loginForm,
    submissionError,
    pending,
    setFormValue,
    doLogin,
    setSignUpDialogOpen,
    hideLoginButton,
    hideSignUpButton,
    disableCard,
    setLoginDialogOpen
}) => {
    const classes = useStyles();

    const content = (
        <Fragment>
            <TextField label="Wallet number"
                       value={loginForm.username}
                       onChange={event => setFormValue("username", event.target.value)}
                       fullWidth
                       margin="dense"
                       className="input-default"
            />
            <TextField label="Password"
                       value={loginForm.password}
                       onChange={event => setFormValue("password", event.target.value)}
                       fullWidth
                       margin="dense"
                       type="password"
            />
            {!hideLoginButton && (
                <Button className={classes.loginButton}
                        color="primary"
                        variant="contained"
                        onClick={doLogin}
                        disabled={pending}
                        fullWidth
                >
                    {pending && <CircularProgress size={14} color="primary"/>}
                    Login
                </Button>
            )}
            {!hideSignUpButton && (
                <Button variant="text"
                        color="primary"
                        fullWidth
                        className={classes.signUpButton}
                        onClick={() => {
                            setLoginDialogOpen(false);
                            setSignUpDialogOpen(true);
                        }}
                        disabled={pending}
                >
                    Sign up for Ignite
                </Button>
            )}
        </Fragment>
    );

    return ( disableCard
            ? content
            : (
                <Fragment>
                    <Card className={classes.loginCard}>
                        <CardContent>
                            {content}
                        </CardContent>
                    </Card>
                </Fragment>
            )
    )
};

const mapMobxToProps = ({login, signUp}) => ({
    loginForm: login.loginForm,
    pending: login.pending,
    submissionError: login.submissionError,
    setFormValue: login.setFormValue,
    doLogin: login.doLogin,
    setSignUpDialogOpen: signUp.setSignUpDialogOpen,
    setLoginDialogOpen: login.setLoginDialogOpen
});

export const LoginForm = inject(mapMobxToProps)(observer(_LoginForm));
